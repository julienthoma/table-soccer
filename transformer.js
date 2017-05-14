const shortid = require('shortid');

module.exports = data => {
  const games = data.games.sort((a, b) => {
    const dateA = new Date(a.startdate);
    const dateB = new Date(b.startdate);

    return dateA.getTime() - dateB.getTime();
  });

  return {
    players: data.players.map(player => {
      return [
        player.id,
        player.name
      ];
    }),
    games: games.map(game => {
      return [
        shortid.generate(),
        new Date(game.startdate).getTime(),
        parseInt((new Date(game.enddate).getTime() - new Date(game.startdate).getTime()) / 1000),
        [
          game.winners[0].id,
          game.winners[1].id,
          game.losers[0].id,
          game.losers[1].id
        ],
        [
          game.winners[0].score,
          game.winners[1].score,
          game.losers[0].score,
          game.losers[1].score
        ],
        game.scoreTimeline.map(item => {
          return [
            item.id,
            getPostionByString(item.position),
            parseInt((new Date(item.timestamp).getTime() - new Date(game.startdate).getTime()) / 1000)
          ]
        })
      ];
    })
  };
};

function getPostionByString(str) {
  const positions = {
    team1FrontPlayer: 0,
    team1RearPlayer: 1,
    team2FrontPlayer: 2,
    team2RearPlayer: 3
  }

  return positions[str];
}