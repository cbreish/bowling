const express = require('express');
const Game = require('./business/game');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const game = new Game();
  game.parse(req.query.rolls);
  res.json(game.score());
});

module.exports = app;
