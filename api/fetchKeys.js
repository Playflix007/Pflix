const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { channelId } = req.query;
  if (!channelId) {
    return res.status(400).json({ error: 'Channel ID is required' });
  }

  try {
    const response = await fetch(`https://babel-in.xyz/babel-b2ef9ad8f0d432962d47009b24dee465/tata/channels/${channelId}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch keys' });
  }
}
