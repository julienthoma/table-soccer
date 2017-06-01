const data = require('./backup.json');
const fs = require('fs');

const result = {
  data: {
    players: {},
    games: {}
  }
}

data.players.forEach(([ id, name ]) => {
  result.data.players[id] = { id, name };
});

data.games.forEach((game) => {
  result.data.games[game[0]] = game;
});

console.log(result);

fs.writeFileSync('res.json', JSON.stringify(result));