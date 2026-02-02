import type { NextApiRequest, NextApiResponse } from 'next'

type Paste = {
  content: string
  ttl_seconds: number
  max_views: number
}

const pastes: Record<string, Paste> = {}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { content, ttl_seconds, max_views } = req.body

  if (!content) {
    return res.status(400).json({ error: 'Content required' })
  }

  const id = Math.random().toString(36).substring(2, 8)
  pastes[id] = { content, ttl_seconds, max_views }

  return res.status(200).json({
    id,
    url: https://pastebin-litee-ten.vercel.app/p/
  })
}
