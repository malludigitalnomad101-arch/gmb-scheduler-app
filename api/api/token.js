// GET /api/token – returns current access-token (we’ll save it after login)
let ACCESS_TOKEN = null; // in-memory for now (upgrade to DB later)

export default function handler(req, res) {
  if (req.method === 'GET') return res.json({ token: ACCESS_TOKEN });
  if (req.method === 'POST') { ACCESS_TOKEN = req.body.token; return res.json({ ok: true }); }
  res.status(405).end();
}
