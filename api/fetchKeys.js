// api/fetchKeys.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const response = await fetch('https://babel-in.xyz/babel-b2ef9ad8f0d432962d47009b24dee465/tata/channels');
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch license keys' });
    }
};
