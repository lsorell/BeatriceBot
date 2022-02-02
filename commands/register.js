const { SlashCommandBuilder } = require('@discordjs/builders');
const { addStartingPoints, getPlayerPoints } = require('../mongo');
const { PredictionData, embedColor } = require('../globals');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Adds you to the game.'),

    async execute(interaction) {
        const id = interaction.user.id;
        const points = await getPlayerPoints(id);
        if (points) {
            return await interaction.reply({ content:'You have already registered and are in the game. Try using **/bank** to see your points!', ephemeral: true });
        }

        await addStartingPoints({ _id: id, name: interaction.user.username, points: PredictionData.startingPoints })
            .then(() => {
                const registerEmbed = new MessageEmbed()
                    .setTitle(`${interaction.user.username} has been added to the game!`)
                    .setColor(embedColor)
                    .addField('Points', PredictionData.startingPoints.toString());
                return interaction.reply({ embeds: [registerEmbed] });
            })
            .catch((e) => {
                return interaction.reply(e.message);
            });
    },
};