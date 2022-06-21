const path = require('path')
const express = require('express');
const http = require('http');
const formatMessage = require('./utils/messages')
const { userjoin, getCurUser} = require('./utils/users')
const socketio = require('socket.io');

const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '_html_css')))

const chatbot = 'Jazzbot';
//run when a client connects
io.on('connection',socket => {
    

    //joinchat
    socket.on('joinChat', ({username}) => {
        const user = userjoin(socket.id, username)

        //Welcome the user
        socket.emit('message',formatMessage(chatbot, 'Welcome to Jazzify'));

        //broadcast when a user enters chat
        socket.broadcast.emit('message',formatMessage(chatbot,`${user.username} has joined the chat`));

        //when client disconnects
        socket.on('disconnect',() => {
        io.emit('message',formatMessage(chatbot,`${user.username} has left the chat`));
    })
    });

    socket.on('chatMessage',msg => {
        const user = getCurUser(socket.id);

        io.emit('message',formatMessage(user.username,msg));
    })

});

server.listen(PORT, () => console.log(`Server running Successfully on port ${PORT}!`));
