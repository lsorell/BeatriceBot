class PredictionData {
    static bettingIsOpen = false;
    static bets = {
        '142821658510491648': { selection: '1', amount: 200 },
        '821866155555815424': { selection: '2', amount: 120 },
    };
    static color = '#39FF14';
    static option1 = 'Lane & Meris';
    static option2 = 'Excraze & Lexus';
    static startingPoints = 1000;
}

const customIds = {
    RESET: 'reset',
}

module.exports = {
    PredictionData,
    customIds: customIds,
};