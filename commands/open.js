const { SlashCommandBuilder } = require('@discordjs/builders');
const { data } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('open')
        .setDescription('Admin command - Opens options for betting.')
        .addStringOption(option =>
            option.setName('option1')
                .setDescription('The first betting option.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option2')
                .setDescription('The second betting option.')
                .setRequired(true))
        .setDefaultPermission(false),

    async execute(interaction) {
        if (data.bettingIsOpen) {
            return interaction.reply('Bet is already open. Close the bet before opening a new one!');
        }

        const opt1 = interaction.options.getString('option1');
        const opt2 = interaction.options.getString('option2');
        if (opt1 && opt2) {
            data.option1 = opt1;
            data.option2 = opt2;
            data.bettingIsOpen = true;
            return interaction.reply(`Betting is open! Option #1: ${opt1} -- Option #2: ${opt2}`);
        }
        return interaction.reply('One of the options you entered is not valid. Try again!');
    },
};