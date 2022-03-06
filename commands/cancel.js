const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PredictionData, embedColor } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cancel')
        .setDescription('Admin command - Cancels the current bet and returns points to players.')
        .setDefaultPermission(false),

    async execute(interaction) {
        // console.log(interaction.commandId);
        PredictionData.bets = {};
        PredictionData.bettingIsOpen = false;
        const cancelEmbed = new MessageEmbed()
            .setTitle('The current bet has been canceled and points have been returned to players!')
            .setColor(embedColor);
        return await interaction.reply({ embeds: [cancelEmbed] });
    },
};