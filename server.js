const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Generate a unique ID for the user
  const userId = socket.id;

  // Send the user's ID to the connected user
  socket.emit('userId', userId);

  socket.on('message', (data) => {
    console.log(`Received from user ${userId}:`, data);
    socket.emit('message', `message reçu (serveur)`);
  });


  socket.on('slider', (data) => {
    console.log(`user ${userId} set value to :`, data);
  });

  socket.on('radio', (data) => {
    console.log(`user ${userId} change Radio to :`, data);
  });

  socket.on('select', (data) => {
    console.log(`user ${userId} select :`, data);
  });


  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
