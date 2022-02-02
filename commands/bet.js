const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PredictionData, embedColor } = require('../globals');
const { getPlayerPoints } = require('../mongo');
const { calculateBettingInfo, createBettingInfoEmbed } = require('./options');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bet')
        .setDescription('Bets a point amount on the given option.')
        .addStringOption(option =>
            option.setName('option')
                .setDescription('The option to bet on.')
                .setRequired(true)
                .addChoice('Option #1', '1')
                .addChoice('Option #2', '2'))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of points to bet.')
                .setRequired(true)),

    async execute(interaction) {
        if (!PredictionData.bettingIsOpen) {
            return await interaction.reply({ content: 'Betting is currently closed. Please wait for betting to be opened.', ephemeral: true });
        }

        // Check that the user has registered
        const points = await getPlayerPoints(interaction.user.id);
        if (!points) {
            return await interaction.reply({ content:'You were not found in the database. To join the game use the command **/register**', ephemeral: true });
        }

        // Check if the user already has a bet placed
        const id = interaction.user.id;
        const selection = interaction.options.getString('option');
        let amount = interaction.options.getInteger('amount');
        if (PredictionData.bets[id]) {
            if (selection === PredictionData.bets[id].selection) {
                const total = PredictionData.bets[id].amount + amount;
                if (hasAvailableFunds(points, total)) {
                    PredictionData.bets[id].amount = total;
                    amount = total;
                }
                else {
                    return await interaction.reply({ content: 'You do not have enough funds to place this bet.', ephemeral: true });
                }
            }
            else {
                return await interaction.reply({ content: `You have already bet on ${PredictionData.bets[id].selection === '1' ? PredictionData.option1 : PredictionData.option2} and cannot change your selection.`, ephemeral: true });
            }
        }
        else if (hasAvailableFunds(points, amount)) {
            PredictionData.bets[id] = { selection, amount };
        }
        else {
            return await interaction.reply({ content: 'You do not have enough funds to place this bet.', ephemeral: true });
        }

        const betEmbed = new MessageEmbed()
            .setTitle(`${interaction.user.username} bet on ${selection === '1' ? PredictionData.option1 : PredictionData.option2}!`)
            .setColor(embedColor)
            .addField('Bet', amount.toString());

        await interaction.reply({ embeds: [betEmbed] });
        return await interaction.channel.send({ embeds: [createBettingInfoEmbed(calculateBettingInfo())] });
    },
};

function hasAvailableFunds(bank, bet) {
    return bank - bet >= 0;
}