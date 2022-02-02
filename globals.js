class PredictionData {
    static bettingIsOpen = false;
    static bets = {};
    static option1 = '';
    static option2 = '';
    static roundEndBonus = 50;
    static startingPoints = 1000;
}

const customIds = {
    RESET: 'reset',
    PAYOUT: 'payout',
}

module.exports = {
    customIds: customIds,
    embedColor: '#39FF14',
    PredictionData,
};