export default async function handler(req, res) {
    const { channel } = req.query;  // Get the channel number from the query parameter

    if (!channel) {
        return res.status(400).json({ error: 'Channel number is required' });
    }

    try {
        // Construct the URL with the channel number
        const url = `https://babel-in.xyz/babel-b2ef9ad8f0d432962d47009b24dee465/tata/channels/${channel}`;
        
        // Fetch data from the external API
        const response = await fetch(url);

        // Check if the response is okay
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch data' });
        }

        // Parse JSON data
        const data = await response.json();
        
        // Return the data
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch license keys' });
    }
}
