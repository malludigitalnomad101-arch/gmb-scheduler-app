export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { prompt } = req.body;
  const seoText = `${prompt} 🔥 Visit us today! #LocalBusiness #${prompt.split(' ')[0]}`;
  res.json({ text: seoText });
}
