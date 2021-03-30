const express = require('express');
const http = require('http');

const { addUser, RemoveUser, getUser, getUsersInRoom} = require('./users.js')

const PORT = process.env.PORT || 5000;

const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
    credentials: true
    }
  });

io.on('connect', socket => {
   socket.on('join',({name,room}, callback) => {
    const {error, user} = getUser({ id: socket.id, name, room});

    if(error) return callback(error);

    socket.join()
  })
    socket.on('disconnect', () => {
        console.log('User had left');
    })
});

app.use(router);

server.listen(PORT);