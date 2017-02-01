var express = require('express');
var app = express();
var port = 1337;
const testGames = require('./testgames');
const testPlayers = require('./testPlayers');

app.use(express.static(__dirname + '/public'));

app.listen(port);

app.get('/games', function(req, res) {
    res.send(testGames);
});

app.get('/players', function(req, res) {
  res.send(testPlayers);
});

console.log('started at port: ' + port);

module.exports = app;