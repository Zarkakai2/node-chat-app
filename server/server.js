const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();

const publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log(`Server is up on port 3000.`);
});