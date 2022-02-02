const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PredictionData, embedColor } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Admin command - Ends the betting period.')
        .setDefaultPermission(false),

    async execute(interaction) {
        // console.log(interaction.commandId);
        if (!PredictionData.bettingIsOpen) {
            return await interaction.reply({ content: 'No bet is currently open. Start a bet with **/open**', ephemeral: true });
        }

        PredictionData.bettingIsOpen = false;
        const closeEmbed = new MessageEmbed()
            .setTitle('The betting period has now ended!')
            .setColor(embedColor);
        return await interaction.reply({ embeds: [closeEmbed] });
    },
};