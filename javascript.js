const dialogflow = require('dialogflow');
const uuid = require('uuid');

// Create a new session client for communicating with the Dialogflow API
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath('YOUR_PROJECT_ID', uuid.v4());

// Function to send a message to the Dialogflow agent and get a response
async function sendMessageToDialogflow(message) {
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'en-US',
            },
        },
    };

    try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        return result.fulfillmentText;
    } catch (err) {
        console.error('Error sending message to Dialogflow:', err);
        return 'Sorry, I encountered an error. Please try again later.';
    }
}

// Function to handle sending a message from the user
async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        appendMessage('You', userInput);
        const response = await sendMessageToDialogflow(userInput);
        appendMessage('Bot', response);
        document.getElementById('user-input').value = '';
    }
}

// Function to append a message to the chat box
function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}
