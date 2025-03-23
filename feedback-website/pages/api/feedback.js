import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { feedback } = req.body;
    const client = await clientPromise;
    const db = client.db('your-database-name'); // Replace with your database name

    await db.collection('feedback').insertOne({ feedback, createdAt: new Date() });
    return res.status(200).json({ message: 'Feedback received' });
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
