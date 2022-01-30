const { SlashCommandBuilder } = require('@discordjs/builders');
const { PredictionData } = require('../globals');
const { getPlayerPoints } = require('../mongo');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bet')
        .setDescription('Bets a point amount on the given option.')
        .addStringOption(option =>
            option.setName('option')
                .setDescription('The option selection.')
                .setRequired(true)
                .addChoice('Option #1', '1')
                .addChoice('Option #2', '2'))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of points to bet.')
                .setRequired(true)),

    async execute(interaction) {
        if (!PredictionData.bettingIsOpen) {
            return interaction.reply('Betting is currently closed. Please wait for betting to be opened.');
        }

        // Check that the user has registered
        const points = await getPlayerPoints(interaction.user.id);
        if (!points) {
            return interaction.reply({ content:'You were not found in the database. To join the game use the command /register', ephemeral: true });
        }

        // Check if the user already has a bet placed
        const id = interaction.user.id;
        const selection = interaction.options.getString('option');
        let amount = interaction.options.getInteger('amount');
        if (PredictionData.bets[id]) {
            if (selection === PredictionData.bets[id].selection) {
                const total = PredictionData.bets[id].amount + amount;
                if (hasAvailableFunds(points, total)) {
                    PredictionData.bets[id].amount = total;
                    amount = total;
                }
                else {
                    return interaction.reply({ content: 'You do not have enough funds to place this bet.', ephemeral: true });
                }
            }
            else {
                return interaction.reply({ content: `You have already bet on ${PredictionData.bets[id].selection === '1' ? PredictionData.option1 : PredictionData.option2} and cannot change your selection.`, ephemeral: true });
            }
        }
        else if (hasAvailableFunds(points, amount)) {
            PredictionData.bets[id] = { id, selection, amount };
        }
        else {
            return interaction.reply({ content: 'You do not have enough funds to place this bet.', ephemeral: true });
        }
        return interaction.reply(`${interaction.user.username} has bid on ${selection === '1' ? PredictionData.option1 : PredictionData.option2} for a total of ${amount} points.`);
        // TODO: Show updated options
    },
};

function hasAvailableFunds(bank, bet) {
    return bank - bet >= 0;
}