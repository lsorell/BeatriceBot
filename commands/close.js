const { SlashCommandBuilder } = require('@discordjs/builders');
const { PredictionData } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Admin command - Ends the betting period.')
        .setDefaultPermission(false),

    async execute(interaction) {
        // console.log(interaction.commandId);
        if (!PredictionData.bettingIsOpen) {
            return interaction.reply('No bet is currently open. Start a bet with /open');
        }

        PredictionData.bettingIsOpen = false;
        return interaction.reply('The betting period has now ended!');
    },
};