import { v4 as uuidv4 } from "uuid";

const store = new Map();

export default function handler(req, res) {
  if (req.method === "POST") {
    const { content, ttl_seconds = 60, max_views = 1 } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content required" });
    }

    const id = uuidv4();

    store.set(id, {
      content,
      expires: Date.now() + ttl_seconds * 1000,
      views: max_views
    });

    return res.status(201).json({
      id,
      url: `/api/pastes/${id}`
    });
  }

  if (req.method === "GET") {
    const { id } = req.query;
    const data = store.get(id);

    if (!data) {
      return res.status(404).send("Not found");
    }

    if (Date.now() > data.expires || data.views <= 0) {
      store.delete(id);
      return res.status(410).send("Expired");
    }

    data.views--;

    return res.status(200).json({
      content: data.content,
      views_left: data.views
    });
  }

  return res.status(405).send("Method not allowed");
}
