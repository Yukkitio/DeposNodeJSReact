const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialisation de l'application Express
const app = express();

// Création du serveur HTTP en utilisant l'application Express
const server = http.createServer(app);

// Configuration de Socket.IO avec les options CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Remplacez par l'URL de votre frontend
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Écouteur d'événement pour gérer les connexions des utilisateurs
io.on('connection', (socket) => {
  console.log('Un utilisateur connecté');

  // Générer un ID unique pour l'utilisateur
  const userId = socket.id;

  // Envoyer l'ID de l'utilisateur connecté à celui-ci
  socket.emit('userId', userId);

  // Écouteurs d'événements pour différents types d'interactions

  socket.on('message', (data) => {
    console.log(`Reçu de l'utilisateur ${userId}:`, data);
    socket.emit('message', `Salut de retour ! (serveur)`);
  });

  socket.on('toggleButton', (data) => {
    console.log(`Utilisateur ${userId} a réglé le bouton sur :`, data);
  });

  socket.on('text', (data) => {
    console.log(`Utilisateur ${userId} a modifié le texte en :`, data);
  });

  socket.on('switch', (data) => {
    console.log(`Utilisateur ${userId} a changé l'état du switch en :`, data);
  });

  socket.on('select', (data) => {
    console.log(`Utilisateur ${userId} a sélectionné :`, data);
  });

  socket.on('checkbox', (data) => {
    console.log(`Utilisateur ${userId} a coché :`, data);
  });

  socket.on('slider', (data) => {
    console.log(`Utilisateur ${userId} a déplacé le curseur vers :`, data);
  });

  // Écouteur d'événement pour gérer la déconnexion de l'utilisateur
  socket.on('disconnect', () => {
    console.log(`Utilisateur ${userId} déconnecté`);
  });
});

// Définition du port d'écoute du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
