require('dotenv').config();
const express = require('express');
const VideoGame = require('./models/video games.js');
const app = express();

app.use(express.json());

//create

app.post('/videogames', async(req, res) => {
  VideoGame
    .insert(req.body)
    .then(videogame => res.send(videogame));
});

//read

app.get('/videogames', (req, res) => {
  VideoGame
    .find()
    .then(videogames => res.send(videogames));
});

//update

app.put('/videogames', (req, res) => {
  VideoGame
    .update(req.body.id, req.body)
    .then(videogames => res.send(videogames));
});

//delete

app.delete('/videogames/:id', (req, res) => {
  VideoGame
    .delete(req.params.id)
    .then(videogames => res.send(videogames));
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
