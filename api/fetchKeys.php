<?php
header('Content-Type: application/json');

// Get the channel ID from the query parameter
$channelId = isset($_GET['id']) ? $_GET['id'] : '';

if (empty($channelId)) {
    echo json_encode(['error' => 'Channel ID is required']);
    http_response_code(400);
    exit();
}

// Define the API URL
$apiUrl = 'https://babel-in.xyz/babel-b2ef9ad8f0d432962d47009b24dee465/tata/channels';

// Fetch the data from the external API
$response = @file_get_contents($apiUrl);

if ($response === FALSE) {
    echo json_encode(['error' => 'Failed to fetch data from API']);
    http_response_code(500);
    exit();
}

// Parse JSON data
$data = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Failed to parse API response']);
    http_response_code(500);
    exit();
}

// Find the specific channel data based on the provided channel ID
$channelData = null;
foreach ($data['channels'] as $channel) {
    if ($channel['id'] === $channelId) {
        $channelData = $channel;
        break;
    }
}

if ($channelData === null) {
    echo json_encode(['error' => 'Channel not found']);
    http_response_code(404);
    exit();
}

// Extract license keys from the channel_key field
$licenseKeys = isset($channelData['channel_key']['keys']) ? $channelData['channel_key']['keys'] : [];
$formattedLicenseKeys = [];

foreach ($licenseKeys as $key) {
    $formattedLicenseKeys[] = [
        'kty' => $key['kty'],
        'k'   => $key['k'],
        'kid' => $key['kid']
    ];
}

// Return the formatted license keys
echo json_encode([
    'licenseKeys' => $formattedLicenseKeys,
    'type'        => $channelData['channel_key']['type'] ?? 'temporary' // Include the type field as needed
]);
http_response_code(200);
