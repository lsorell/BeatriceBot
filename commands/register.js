const { SlashCommandBuilder } = require('@discordjs/builders');
const { addStartingPoints } = require('../mongo');
const { data } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Adds you to the game.'),

    async execute(interaction) {
        console.log(data);
        console.log(data.bettingIsOpen);
        console.log(data.startingPoints);
        await addStartingPoints({ _id: interaction.user.id, name: interaction.user.username, points: data.startingPoints })
            .then(() => {
                return interaction.reply(`${interaction.user.username} has been added to the game with ${data.startingPoints} starting points!`);
            })
            .catch((e) => {
                return interaction.reply(e.message);
            });
    },
};