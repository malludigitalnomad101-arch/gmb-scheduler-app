import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { text, callToAction } = req.body;

  // get token we saved earlier
  const tokenRes = await fetch(`${process.env.VERCEL_URL}/api/token`);
  const { token } = await tokenRes.json();
  if (!token) return res.status(401).json({ error: 'Not logged in' });

  // setup auth
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: token });
  const gmb = google.mybusinessbusinessinformation({ version: 'v1', auth });

  // list first location
  const { data } = await gmb.accounts.list();
  const account = data.accounts?.[0];
  if (!account) return res.status(404).json({ error: 'No GMB account' });

  const { data: locs } = await gmb.accounts.locations.list({ parent: account.name });
  const location = locs.locations?.[0];
  if (!location) return res.status(404).json({ error: 'No locations' });

  // create the post
  await gmb.accounts.locations.localPosts.create({
    parent: location.name,
    requestBody: {
      summary: text,
      callToAction: { actionType: callToAction || 'LEARN_MORE' },
      // publish instantly (set schedule later)
      publishTime: new Date().toISOString()
    }
  });

  res.json({ msg: 'Live post created on Google!' });
}
