export default async function handler(req, res) {
    const { id } = req.query;  // Get the channel ID from the query parameter

    // Log the query parameters to debug
    console.log('Received query parameters:', req.query);

    if (!id) {
        return res.status(400).json({ error: 'Channel ID is required' });
    }

    try {
        // Fetch all data from the external API
        const response = await fetch('https://babel-in.xyz/babel-b2ef9ad8f0d432962d47009b24dee465/tata/channels');
        
        if (!response.ok) {
            console.error(`Failed to fetch data: ${response.statusText}`);
            return res.status(response.status).json({ error: 'Failed to fetch data from API' });
        }

        // Parse JSON data
        const data = await response.json();

        // Log the response to verify its structure
        console.log('API Response:', data);

        // Find the specific channel data based on the provided channel ID
        const channelData = data.channels.find(item => item.id === id);  // Adjust 'id' based on actual response

        if (!channelData) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        // Extract license keys and format them
        const formattedLicenseKeys = channelData.licenseKeys.map(key => ({
            kty: key.kty,
            k: key.k,
            kid: key.kid
        }));

        // Return the formatted license keys
        res.status(200).json({
            licenseKeys: formattedLicenseKeys,
            type: 'temporary' // Include the type field as needed
        });
    } catch (error) {
        console.error('Error fetching license keys:', error);
        res.status(500).json({ error: 'Failed to fetch license keys' });
    }
}
