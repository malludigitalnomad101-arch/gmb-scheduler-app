import { google } from 'googleapis';

export default async function handler(req, res) {
  const { code } = req.body;
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://gmb-scheduler-app.vercel.app/callback.html'
  );
  const { tokens } = await oauth2Client.getToken(code);
  res.json({ access_token: tokens.access_token });
}
