const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PredictionData, embedColor } = require('../globals');
const { getPlayerPoints } = require('../mongo');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bank')
        .setDescription('Shows the amount of points you have.'),

    async execute(interaction) {
        const points = await getPlayerPoints(interaction.user.id);
        if (!points) {
            return await interaction.reply({ content:'You were not found in the database. To join the game use the command **/register**', ephemeral: true });
        }

        const bankEmbed = new MessageEmbed()
            .setTitle(`${interaction.user.username}'s Bank`)
            .setColor(embedColor);

        const id = interaction.user.id;
        if (PredictionData.bets[id]) {
            const bet = PredictionData.bets[id].amount;
            bankEmbed.addFields(
                { name: 'Bank', value: (points - bet).toString(), inline: true },
                { name: 'Bet', value: bet.toString(), inline: true },
            );
        }
        else {
            bankEmbed.addField('Bank', points.toString());
        }
        return await interaction.reply({ embeds: [bankEmbed] });
    },
};