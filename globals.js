class PredictionData {
    constructor() {
        this.bettingIsOpen = false;
        this.option1 = '';
        this.option2 = '';
        this.startingPoints = 1000;
    }
}

const customIds = {
    RESET: 'reset',
};

const data = new PredictionData();
module.exports = {
    data: data,
    customIds: customIds,
};