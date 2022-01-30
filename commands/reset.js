const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { deleteAllPoints } = require('../mongo');
const { customIds } = require('../globals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Admin command - De-registers all users and resets the entire game.')
        .setDefaultPermission(false),

    async execute(interaction) {
        // console.log(interaction.commandId);
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(customIds.RESET)
                    .setLabel('Yes. Reset the game')
                    .setStyle('DANGER'),
            );

        return interaction.reply({
            content: 'Are you sure you want to reset the game? **This action cannot be undone.**',
            ephemeral: true,
            components: [row],
        });
    },

    async reset(interaction) {
        await deleteAllPoints()
            .then(() => {
                return interaction.reply({ content:'The game was reset succesfully!', ephemeral: true });
            })
            .catch((e) => {
                return interaction.reply(e.message);
            });
    },
};