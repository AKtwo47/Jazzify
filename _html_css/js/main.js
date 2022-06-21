const chatform = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const {username} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
}); 

console.log(username);

const socket = io();

socket.emit('joinChat', {username})

socket.on('message',message => {
    console.log(message);
    outputMessage(message);

    //auto-scroll
    chatMessages.scrollTop = chatMessages.scrollHeight;

    
});

//message submit
chatform.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const msg = e.target.elements.msg.value;

    console.log(msg);

    //send mssg to server
    socket.emit('chatMessage',msg);

    e.target.elements.msg.value = ``;
    e.target.elements.msg.focus();
});

function outputMessage(message) {
    const div =  document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}