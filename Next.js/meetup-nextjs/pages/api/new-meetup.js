import { MongoClient } from 'mongodb';
// /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://Wokila:k5vu9ax4zLFUEVk@cluster0.toak6.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollections = db.collection('meetups')
        const result = await meetupsCollections.insertOne({data});
        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted.'});
    }

}

export default handler;