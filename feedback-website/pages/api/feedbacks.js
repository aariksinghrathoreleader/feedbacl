const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Add your MongoDB URI in .env.local
const options = {};

let client;
let clientPromise;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
  }
  return client;
};

exports.handler = async (event, context) => {
  const client = await connectToDatabase();
  const db = client.db('your-database-name'); // Replace with your database name

  if (event.httpMethod === 'GET') {
    const feedbacks = await db.collection('feedback').find({}).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(feedbacks),
    };
  }
  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
