const express = require('express');
const app = express();
const port = 1339;
const bodyParser = require('body-parser')
const fs = require('fs');
const crypto = require('crypto');

app.use(bodyParser.json());
app.listen(port);

app.get('/data', function(req, res) {
    res.send(getData());
});

app.post('/data/savegame', function(req, res) {
  const game = req.body;
  const data = getData();
  const dateString = new Date().valueOf().toString();
  game.id = crypto.createHash('sha1').update(dateString + Math.random()).digest('hex');
  data.games.push(game);
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.send(data);
});

app.use(express.static(__dirname + '/public'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


console.log('started at port: ' + port);

module.exports = app;

const getData = () => {
  let data;

  try {
    data = require('./data.json');
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      data = {
        games:[],
        players: []
      };
      fs.writeFileSync('./data.json', JSON.stringify(data));
    }
  }

  return data;
}