const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PredictionData } = require('../globals');

class OptionInfo {
    points = 0;
    ratio = 1;
    bets = 0;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('options')
        .setDescription('Shows the betting options and info.'),

    async execute(interaction) {
        return interaction.reply({ embeds: [this.createBettingInfoEmbed(this.calculateBettingInfo())] });
    },

    calculateBettingInfo() {
        const option1Info = new OptionInfo();
        const option2Info = new OptionInfo();
        for (const bet of Object.values(PredictionData.bets)) {
            if (bet.selection === '1') {
                option1Info.bets++;
                option1Info.points += bet.amount;
            }
            else {
                option2Info.bets++;
                option2Info.points += bet.amount;
            }
        }

        const points1 = option1Info.points;
        const points2 = option2Info.points;
        if (points1 === 0 || points2 === 0) {
            option1Info.ratio = 1;
            option2Info.ratio = 1;
        }
        else{
            option1Info.ratio += points2 / points1;
            option2Info.ratio += points1 / points2;
        }
        return { option1Info, option2Info }
    },

    createBettingInfoEmbed(info) {
        const { option1Info, option2Info } = info;
        return new MessageEmbed()
            .setTitle('Betting Options')
            .setColor(PredictionData.color)
            .addFields(
                { name: 'Option #1', value: PredictionData.option1, inline: true },
                { name: 'Option #2', value: PredictionData.option2, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Total Points', value: option1Info.points.toString(), inline: true },
                { name: '\u200B', value: option2Info.points.toString(), inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Return Ratio', value: option1Info.ratio.toFixed(2).toString(), inline: true },
                { name: '\u200B', value: option2Info.ratio.toFixed(2).toString(), inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Total Bets', value: option1Info.bets.toString(), inline: true },
                { name: '\u200B', value: option2Info.bets.toString(), inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
            );
    },
};