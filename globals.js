class PredictionData {
    static bettingIsOpen = false;
    static option1 = '';
    static option2 = '';
    static startingPoints = 1000;
}

const customIds = {
    RESET: 'reset',
}

module.exports = {
    PredictionData,
    customIds: customIds,
};