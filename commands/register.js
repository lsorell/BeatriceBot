const { SlashCommandBuilder } = require('@discordjs/builders');
const { addPoints } = require('../mongo');
const { startingPoints } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Adds you to the game.'),

    async execute(interaction) {
        await addPoints({ _id: interaction.user.id, name: interaction.user.username, points: startingPoints })
            .then(() => {
                return interaction.reply(`${interaction.user.username} has been added to the game with ${startingPoints} starting points!`);
            })
            .catch((e) => {
                return interaction.reply(e.message);
            });
    },
};