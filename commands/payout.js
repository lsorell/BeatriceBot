const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { getPlayerPoints, updatePlayerPoints } = require('../mongo');
const { PredictionData, customIds, embedColor } = require('../globals');
const { calculateBettingInfo } = require('./options');
const { createLeaderboardEmbed } = require('./leaderboard');

let winner = '';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('payout')
        .setDescription('Admin command - Pays out the correct predictors and shows the leaderboard.')
        .addStringOption(option =>
            option.setName('option')
                .setDescription('The winning option.')
                .setRequired(true)
                .addChoice('Option #1', '1')
                .addChoice('Option #2', '2'))
        .setDefaultPermission(false),

    async execute(interaction) {
        // console.log(interaction.commandId);
        winner = interaction.options.getString('option');
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(customIds.PAYOUT)
                    .setLabel(`Payout Option #${winner}`)
                    .setStyle('PRIMARY'),
            );

        return await interaction.reply({
            content: `Are you sure you want to payout the players that predicted *${winner === '1' ? PredictionData.option1 : PredictionData.option2}*? **This action cannot be undone.**`,
            ephemeral: true,
            components: [row],
        });
    },

    async payout(interaction) {
        const { option1Info, option2Info } = calculateBettingInfo();
        let winnerTotal = 0;
        for (const [id, bet] of Object.entries(PredictionData.bets)) {
            const prevPoints = await getPlayerPoints(id).catch((e) => {
                return interaction.reply({ content: e.message + ' Please try paying out again.', ephemeral: true });
            });

            let newPoints = prevPoints - bet.amount;
            if (bet.selection === winner) {
                const winnings = bet.amount * (winner === '1' ? option1Info.ratio : option2Info.ratio);
                newPoints += winnings;
                winnerTotal += winnings;
            }
            await updatePlayerPoints(id, newPoints + PredictionData.roundEndBonus);
        }

        // Reset bets object
        PredictionData.bets = {};

        const winnerEmbed = new MessageEmbed()
            .setTitle(`The winnner is ${winner === '1' ? PredictionData.option1 : PredictionData.option2}!!!`)
            .setDescription(`${winnerTotal} points were payed out to the believers! \n
                Round end bonus of ${PredictionData.roundEndBonus} points was given out to everyone.`)
            .setColor(embedColor);
        await interaction.reply({ content: 'Payout delivered.', ephemeral: true });
        await interaction.channel.send({ embeds: [winnerEmbed] });
        return await interaction.channel.send({ embeds: [await createLeaderboardEmbed()] });
    },
};