const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PredictionData, embedColor } = require('../globals');

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
        // console.log(interaction.commandId);
        if (PredictionData.bettingIsOpen) {
            return await interaction.reply({ content:'Bet is already open. Close the bet with **/close** before opening a new one!', ephemeral: true });
        }

        const opt1 = interaction.options.getString('option1');
        const opt2 = interaction.options.getString('option2');
        if (opt1 && opt2) {
            PredictionData.option1 = opt1;
            PredictionData.option2 = opt2;
            PredictionData.bettingIsOpen = true;

            const openEmbed = new MessageEmbed()
                .setTitle('Betting is open!')
                .setColor(embedColor)
                .addFields(
                    { name: 'Option #1', value: PredictionData.option1, inline: true },
                    { name: 'Option #2', value: PredictionData.option2, inline: true },
                );
            return await interaction.reply({ embeds: [openEmbed] });
        }
        return await interaction.reply({ content: 'One of the options you entered is not valid. Try again!', ephemeral: true });
    },
};