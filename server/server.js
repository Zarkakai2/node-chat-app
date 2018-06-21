const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const app = express();

const publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

io.on('connection', (socket) => {
    socket.on('join', (params, callback) => {
        const name = params.name;
        const room = params.room;
        if (!isRealString(name) || !isRealString(room)) {
            return callback('Name and room name are required.');
        }

        socket.join(room);
        users.removeUser(socket.id);
        users.addUser(socket.id, name, room);

        io.to(room).emit('updateUserList', users.getUserList(room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined`));
        console.log(`${name} has joined the room ${room}`);
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
            console.log(`${user.name} has left the room ${user.room}`);
        }
    });
});

server.listen(3000, () => {
    console.log(`Server is up on port 3000.`);
});