const { SlashCommandBuilder } = require('@discordjs/builders');
const { addStartingPoints } = require('../mongo');
const { PredictionData } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Adds you to the game.'),

    async execute(interaction) {
        await addStartingPoints({ _id: interaction.user.id, name: interaction.user.username, points: PredictionData.startingPoints })
            .then(() => {
                return interaction.reply(`${interaction.user.username} has been added to the game with ${PredictionData.startingPoints} starting points!`);
            })
            .catch((e) => {
                return interaction.reply(e.message);
            });
    },
};