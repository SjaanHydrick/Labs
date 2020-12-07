const express = require('express');
const VideoGame = require('./models/video games');
const app = express();

app.post('/videogames', async(req, res) => {
  const videoGames = await VideoGame.insert(req.body);
  res.send(videoGames);
});

app.get('/videogames', (req, res) => {
  VideoGame
    .find()
    .then(videogames => res.send(videogames));
});

module.exports = app;
