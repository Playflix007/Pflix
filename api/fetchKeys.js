// api/fetchKeys.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Channel ID is required' });
  }

  try {
    const apiUrl = `https://babel-in.xyz/babel-b2ef9ad8f0d432962d47009b24dee465/tata/channels/keys/${id}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch data' });
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
