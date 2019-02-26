var express = require('express');
var path = require('path');
const Game = require('./business/game');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res, next) {
    const game = new Game();
    game.parse(req.query.rolls);
    res.json(game.score());
  });

module.exports = app;
