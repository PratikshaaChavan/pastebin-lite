import { Redis } from '@upstash/redis';
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;
    const id = Math.random().toString(36).substring(2, 10);
    await redis.set(id, content);
    return res.status(200).json({ id });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
