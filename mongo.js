const { MongoClient } = require('mongodb');
const { url } = require('./config.json');

module.exports = {
    async addStartingPoints(obj) {
        const client = new MongoClient(url);
        try {
            await client.connect();
            await client.db('predictions').collection('points').insertOne(obj);
        }
        catch (e) {
            console.error(e);
            if (e.message.includes('duplicate key error')) {
                // eslint-disable-next-line quotes
                throw Error("You're already added to the game!");
            }
            throw Error('Something went wrong adding you to the database.');
        }
        finally {
            await client.close();
        }
    },

    async deleteAllPoints() {
        const client = new MongoClient(url);
        try {
            await client.connect();
            await client.db('predictions').collection('points').deleteMany({});
        }
        catch (e) {
            console.error(e);
            throw Error('Something went wrong while deleting data in the database.');
        }
        finally {
            await client.close();
        }
    },
};
