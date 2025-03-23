import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('your-database-name'); // Replace with your database name

  if (req.method === 'GET') {
    const feedbacks = await db.collection('feedback').find({}).toArray();
    return res.status(200).json(feedbacks);
  }
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
