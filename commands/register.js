const { SlashCommandBuilder } = require('@discordjs/builders');
const { addStartingPoints, getPlayerPoints } = require('../mongo');
const { PredictionData } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Adds you to the game.'),

    async execute(interaction) {
        const id = interaction.user.id;
        const points = await getPlayerPoints(id);
        if (points) {
            return interaction.reply({ content:'You have already registered and are in the game.', ephemeral: true });
        }

        await addStartingPoints({ _id: id, name: interaction.user.username, points: PredictionData.startingPoints })
            .then(() => {
                return interaction.reply(`${interaction.user.username} has been added to the game with ${PredictionData.startingPoints} starting points!`);
            })
            .catch((e) => {
                return interaction.reply(e.message);
            });
    },
};