export default async function handler(req, res) {
    try {
        // Fetch data from the API
        const response = await fetch('https://babel-in.xyz/babel-b2ef9ad8f0d432962d47009b24dee465/tata/channels');

        // Check if the response is okay
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return res.status(response.status).json({ error: 'Failed to fetch data' });
        }

        // Parse the response as JSON
        const data = await response.json();

        // Log the data for debugging
        console.log('Fetched data:', data);

        // Assuming the response has a structure like this
        const formattedData = {
            keys: data.keys, // Adjust this based on the actual API response structure
            type: data.type
        };

        // Send the formatted data as a response
        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error fetching license keys:', error);
        res.status(500).json({ error: 'Failed to fetch license keys' });
    }
}
