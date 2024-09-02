export default async function handler(req, res) {
    const { channel } = req.query;  // Get the channel number from the query parameter

    if (!channel) {
        return res.status(400).json({ error: 'Channel number is required' });
    }

    try {
        // Fetch all data from the external API
        const response = await fetch('https://babel-in.xyz/babel-b2ef9ad8f0d432962d47009b24dee465/tata/channels');
        
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch data' });
        }

        // Parse JSON data
        const data = await response.json();

        // Extract license keys for the specified channel
        const channelData = data.channels.find(item => item.channelNumber === channel);

        if (!channelData) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        // Return the license keys for the specified channel
        res.status(200).json({
            licenseKeys: channelData.licenseKeys // Adjust the property name based on actual data structure
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch license keys' });
    }
}
