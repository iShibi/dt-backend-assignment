import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { client } from './index.js';

export const router = Router();

router.get('/events', async (req, res) => {
	const { query } = req;
	const eventDoc = await client
		.db('test_db')
		.collection('events')
		.findOne({ _id: ObjectId(query.id) });
	return res.json(eventDoc);
});

router.post('/events', async (req, res) => {
	const { body } = req;
	const { insertedId } = await client.db('test_db').collection('events').insertOne(body);
	const newEventDoc = await client
		.db('test_db')
		.collection('events')
		.findOne({ _id: ObjectId(insertedId) });
	return res.json(newEventDoc);
});

router.put('/events/:id', async (req, res) => {
	const { body, params } = req;
	const updatedEventDoc = await client
		.db('test_db')
		.collection('events')
		.findOneAndUpdate({ _id: ObjectId(params.id) }, { $set: body }, { returnDocument: 'after' });
	return res.json(updatedEventDoc.value);
});

router.delete('/events/:id', async (req, res) => {
	const { params } = req;
	const deletedDetails = await client
		.db('test_db')
		.collection('events')
		.deleteOne({ _id: ObjectId(params.id) });
	return res.json(deletedDetails);
});
