loginUserChatbot()

function loginUserChatbot(){
    const userName = localStorage.getItem('mediHelpUserName');

    if (userName) {
        document.getElementById('greeting').textContent = `Hi ${userName}! How can I help you today? Please provide your weight in kilograms.`;
    } else {
        document.getElementById('greeting').textContent = `Hi ${userName}! How can I help you today? Please provide your weight in kilograms.`;
    }

}

const BOT = "bot";
const USER = "user";

const scrollToBottom = () => {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.scrollTop = messageContainer.scrollHeight;
};

const displayMessage = (text, sender) => {
    const messageContainer = document.getElementById('messageContainer');
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box', sender);

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content', sender);

    const avatar = document.createElement('div');
    avatar.classList.add('avatar', sender);
    avatar.textContent = sender === BOT ? 'Ax' : 'U';

    const messagePaper = document.createElement('div');
    messagePaper.classList.add('message-paper', sender);

    const messageText = document.createElement('p');
    messageText.classList.add('message-text', sender);
    messageText.textContent = text;

    messagePaper.appendChild(messageText);
    messageContent.appendChild(avatar);
    messageContent.appendChild(messagePaper);
    messageBox.appendChild(messageContent);
    messageContainer.appendChild(messageBox);

    scrollToBottom();
};

document.getElementById('sendButton').addEventListener('click', async () => {
    const input = document.getElementById('messageInput').value.trim();
    if (input !== "") {
        displayMessage(input, USER);
        try {
            const res = await axios.post("http://localhost:5000/chatbot/chat", {
                message: input,
            });
            const bot_msg = res.data.response;
            displayMessage(bot_msg, BOT);
        } catch (err) {
            toastr.error(err.message);
            toastr.clearWaitingQueue();
        } finally {
            document.getElementById('messageInput').value = "";
            scrollToBottom();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    scrollToBottom();
});
