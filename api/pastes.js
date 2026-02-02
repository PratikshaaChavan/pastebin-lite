let pastes = {};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body);
      const { content, ttl_seconds, max_views } = body;

      if (!content || !ttl_seconds || !max_views) {
        return res.status(400).json({ error: 'Missing fields' });
      }

      const id = Math.random().toString(36).substring(2, 8);
      pastes[id] = { content, ttl_seconds, max_views };

      return res.status(200).json({
        id,
        url: \https://pastebin-litee-ten.vercel.app/p/\\,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: \Method \ not allowed\ });
  }
}
