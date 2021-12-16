const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echos back the message.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to echo back')
                .setRequired(true)),
    async execute(interaction) {
        const message = interaction.options.getString('message');
        if (message) return interaction.reply(message);
        return interaction.reply('No message was provided!');
    },
};