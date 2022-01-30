const { SlashCommandBuilder } = require('@discordjs/builders');
const { PredictionData } = require('../globals');
const { getPlayerPoints } = require('../mongo');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bank')
        .setDescription('Shows the amount of points you have.'),

    async execute(interaction) {
        const points = await getPlayerPoints(interaction.user.id);
        if (!points) {
            return interaction.reply({ content:'You were not found in the database. To join the game use the command /register', ephemeral: true });
        }

        const id = interaction.user.id;
        if (PredictionData.bets[id]) {
            const bet = PredictionData.bets[id].amount;
            return interaction.reply(`You have ${points - bet} points in the bank and ${bet} points placed on a bet.`);
        }
        return interaction.reply(`You have ${points} points.`);
    },
};