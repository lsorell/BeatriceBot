const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../globals');
const { getPointLeaders } = require('../mongo');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Shows the amount of points you have.'),

    async execute(interaction) {
        const leaderboard = await this.createLeaderboardEmbed();
        if (leaderboard) {
            return interaction.reply({ embeds: [leaderboard] });
        }
        return interaction.reply({ content: 'No players are in the database.', ephemeral: true });
    },

    async createLeaderboardEmbed() {
        const leaders = await getPointLeaders();
        if (leaders.length === 0) {
            return null;
        }

        let places = '';
        let playerNames = '';
        let playerPoints = '';
        for (let i = 0; i < leaders.length; i++) {
            const player = leaders[i];
            places += `#${i + 1}\n`;
            playerNames += `${player.name}\n`;
            playerPoints += `${player.points}\n`;
        }

        return new MessageEmbed()
            .setTitle('Leaderboard')
            .setColor(embedColor)
            .addFields(
                { name: '\u200B', value: places, inline: true },
                { name: 'Player', value: playerNames, inline: true },
                { name: 'Points', value: playerPoints, inline: true },
            );
    },
};