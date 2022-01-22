class PredictionData {
    static bettingIsOpen = false;
    static option1 = '';
    static option2 = '';
    static startingPoints = 1000;
}

const data = new PredictionData();

module.exports = {
    data: data
};