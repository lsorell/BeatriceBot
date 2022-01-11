const { MongoClient } = require('mongodb');
const { url } = require('./config.json');

module.exports = {
    async addPoints(obj) {
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
};
