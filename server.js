const express = require('express');
const app = express();
const port = 1339;
const testPlayers = require('./testPlayers');
const bodyParser = require('body-parser')
const fs = require('fs');
const crypto = require('crypto');

app.use(bodyParser.json());

app.listen(port);

app.get('/data/games', function(req, res) {
    const testGames = require('./testgames.json');
    res.send(testGames);
});

app.get('/data/players', function(req, res) {
  res.send(testPlayers);
});

app.post('/data/savegame', function(req, res) {
  const game = req.body;
  const testGames = require('./testgames.json');
  const dateString = new Date().valueOf().toString();
  game.id = crypto.createHash('sha1').update(dateString + Math.random()).digest('hex');
  testGames.push(game);

  fs.writeFileSync('./testgames.json', JSON.stringify(testGames));

  res.send(testGames);
});

app.use(express.static(__dirname + '/public'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


console.log('started at port: ' + port);

module.exports = app;
