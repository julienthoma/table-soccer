const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const fs = require('fs');
const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient
const config = require('./config.json');
let db;

MongoClient.connect(config.dbUrl, (err, database) => {
  if (err) return console.log(err)
  db = database

  app.listen(port);
});

app.use(bodyParser.json());

app.get('/data', function (req, res) {
  db.collection('games').find().toArray(function(err, games) {
    db.collection('players').find().toArray(function(err, players) {
      res.send({
        players: players,
        games: games
      });
    });
  });
});

app.post('/data/addplayer', function (req, res) {
  db.collection('players').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')

    res.send(result);
  });
});

app.post('/data/savegame', function (req, res) {
  const dateString = new Date().valueOf().toString();
  const game = req.body;
  game.id = crypto.createHash('sha1').update(dateString + Math.random()).digest('hex');

  db.collection('games').save(game, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.send('ok');
  })
});


app.use(express.static(__dirname + '/public'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

console.log('started at port: ' + port);

module.exports = app;