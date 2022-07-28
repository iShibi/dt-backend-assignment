import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { router } from './api.js';

const app = express();
app.use(bodyParser.json());
app.use('/api/v3/app', router);

const PORT = 3000;

const uri = process.env.DT_MONGO_URI;
export const client = new MongoClient(uri);

async function connecToDatabase() {
	try {
		await client.connect();
		console.log('Connected to Database.');
	} catch (error) {
		console.error(error);
	}
}

app.get('/', (req, res) => {
	res.json('Pong!');
});

app.listen(PORT, async () => {
	await connecToDatabase();
	console.log(`Server started on http://localhost:${PORT}`);
});
