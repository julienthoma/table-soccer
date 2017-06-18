export const normalizeValue = (value, property, inverted) => {
  const range = property.max.value - property.min.value;

  const steps = range / 10;
  const overMin = value - property.min.value;
  const rating = Math.max(1, Math.ceil(overMin / steps));

  return inverted ? 11 - rating : rating;
};

function getWeek(dt) {
  const tdt = new Date(dt.valueOf());
  const dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  const firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + (4 - tdt.getDay() + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

export const groupGamesByWeek = games => {
  const group = {};
  console.log('bax');

  games.forEach(game => {
    const _key = getWeek(game.startdate);

    if (!group[_key]) {
      group[_key] = {
        month: _key,
        label: _key,
        date: game.startdate,
        games: []
      };
    }

    group[_key].games.push(game);
  });

  return group;
};

export const getMmmrOfWeeks = (games, playerId) => {
  const gamesOfPlayer = games
    .filter(game => game.players[playerId])
    .sort((a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime());

  const groupedGames = groupGamesByWeek(gamesOfPlayer);

  const keys = Object.keys(groupedGames).sort((a, b) => a - b);

  const labels = keys.map(key => groupedGames[key].label);
  const data = keys.map(key => {
    const group = groupedGames[key];
    return group.games[group.games.length - 1].players[playerId].elo;
  });

  return {
    labels,
    data
  };
};
