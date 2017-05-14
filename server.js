const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3000;
let db;

MongoClient.connect(process.env.DB_URL, (err, database) => {
  db = database;
  app.listen(port);
});

app.use(bodyParser.json());

app.get('/data', async (req, res) => {
  const games = await getGames();
  const players = await getPlayers();

  res.send({ players, games });
});

async function getGames() {
  const games = await db.collection('gamesv2').find().toArray();

  return games.map(game => game.data);
}

async function getPlayers() {
  const players = await db.collection('playersv2').find().toArray();

  return players.map(player => player.data);
}

app.post('/data/addplayers', (req, res) => {
  const players = req.body.map(player => ({ data: player }));
  db.collection('playersv2').insert(players, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

app.post('/data/addgames', (req, res) => {
  const _games = req.body.map(game => ({ data: game }));
  db.collection('gamesv2').insert(_games, async (err) => {
    if (err) return res.send(err);

    const games = await getGames();
    const players = await getPlayers();

    res.send({ players, games });
  });
});

app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

module.exports = app;
