const { SlashCommandBuilder } = require('@discordjs/builders');
const { startingPoints } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Adds you to the game.'),
    async execute(interaction) {
        return interaction.reply(`${interaction.user.username} has been added to the game with ${startingPoints} starting points!`);
    },
};