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

    async getPlayerPoints(id) {
        const client = new MongoClient(url);
        try {
            await client.connect();
            const player = await client.db('predictions').collection('points').findOne({ _id: id });
            return player ? player.points : player;
        }
        catch (e) {
            console.error(e);
            throw Error('Something went wrong while checking the database.');
        }
        finally {
            await client.close();
        }
    },

    async getPointLeaders() {
        const client = new MongoClient(url);
        try {
            await client.connect();
            const leaders = await client.db('predictions').collection('points').find().sort({ points: -1 }).toArray();
            return leaders;
        }
        catch (e) {
            console.error(e);
            throw Error('Something went wrong while checking the database.');
        }
        finally {
            await client.close();
        }
    },

    async updatePlayerPoints(id, points) {
        const client = new MongoClient(url);
        try {
            await client.connect();
            await client.db('predictions').collection('points').updateOne({ _id: id }, { $set: { points } });
        }
        catch (e) {
            console.error(e);
            throw Error('Something went wrong while checking the database.');
        }
        finally {
            await client.close();
        }
    },
};
