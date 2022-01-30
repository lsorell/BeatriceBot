const { SlashCommandBuilder } = require('@discordjs/builders');
const { PredictionData } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cancel')
        .setDescription('Admin command - Cancels the current bet and returns points to players.')
        .setDefaultPermission(false),

    async execute(interaction) {
        console.log(interaction.commandId);
        if (!PredictionData.bettingIsOpen) {
            return interaction.reply({ content: 'No bet is currently open. Start a bet with /open', ephemeral: true });
        }

        PredictionData.bettingIsOpen = false;
        PredictionData.bets = {};
        return interaction.reply('The current bet has been canceled and points have been returned to players!');
    },
};