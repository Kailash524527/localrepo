// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messages');

// Sample data for demonstration
const users = [
    { id: 1, name: 'Alex', avatar: 'https://ui-avatars.com/api/?name=Alex&background=random' },
    { id: 2, name: 'Sam', avatar: 'https://ui-avatars.com/api/?name=Sam&background=random' },
    { id: 3, name: 'Taylor', avatar: 'https://ui-avatars.com/api/?name=Taylor&background=random' }
];

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Simulate receiving messages (for demo)
setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance of receiving a message
        const randomUser = users[Math.floor(Math.random() * users.length)];
        receiveMessage(randomUser, `This is a sample message from ${randomUser.name} at ${new Date().toLocaleTimeString()}`);
    }
}, 5000);

// Functions
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    // Create message element
    const messageElement = createMessageElement({
        sender: 'You',
        text: messageText,
        time: new Date(),
        isSent: true
    });

    messagesContainer.appendChild(messageElement);
    scrollToBottom();

    // Clear input
    messageInput.value = '';

    // In a real app, you would send the message to the server here
    // Example: socket.emit('sendMessage', { text: messageText });
}

function receiveMessage(user, text) {
    const messageElement = createMessageElement({
        sender: user.name,
        text: text,
        time: new Date(),
        avatar: user.avatar,
        isSent: false
    });

    messagesContainer.appendChild(messageElement);
    scrollToBottom();
}

function createMessageElement({ sender, text, time, avatar, isSent }) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;

    const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!isSent && avatar) {
        const img = document.createElement('img');
        img.src = avatar;
        img.alt = sender;
        img.className = 'profile-img';
        messageDiv.appendChild(img);
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'message-info';

    const senderSpan = document.createElement('span');
    senderSpan.className = 'sender';
    senderSpan.textContent = sender;

    const timeSpan = document.createElement('span');
    timeSpan.className = 'time';
    timeSpan.textContent = timeString;

    infoDiv.appendChild(senderSpan);
    infoDiv.appendChild(timeSpan);

    const textP = document.createElement('p');
    textP.textContent = text;

    contentDiv.appendChild(infoDiv);
    contentDiv.appendChild(textP);

    messageDiv.appendChild(contentDiv);

    if (isSent) {
        const img = document.createElement('img');
        img.src = 'https://ui-avatars.com/api/?name=You&background=random';
        img.alt = 'You';
        img.className = 'profile-img';
        messageDiv.appendChild(img);
    }

    return messageDiv;
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Initialize with some sample messages
window.onload = function() {
    receiveMessage(users[0], "Hey there! Welcome to our chat app!");
    receiveMessage(users[1], "This is a beautiful UI, isn't it?");
};