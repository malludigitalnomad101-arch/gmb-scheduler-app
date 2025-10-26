export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { when, text } = req.body;
  console.log('Scheduled:', when, text);
  res.json({ msg: `Post scheduled for ${when}` });
}
