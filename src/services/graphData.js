import moment from 'moment';

export const normalizeValue = (value, property, inverted) => {
  const range = property.max.value - property.min.value;

  const steps = range / 10;
  const overMin = value - property.min.value;
  const rating = Math.max(1, Math.ceil(overMin / steps));

  return inverted ? 11 - rating : rating;
};

export const groupGamesByMonth = games => {
  const group = {};

  games.forEach(game => {
    const date = moment(game.startdate);
    const monthYearKey = date.format('YYYY-MM');

    if (!group[monthYearKey]) {
      group[monthYearKey] = {
        month: monthYearKey,
        label: date.format('MMM'),
        date: game.startdate,
        games: []
      };
    }

    group[monthYearKey].games.push(game);
  });

  return group;
};

export const groupGamesByWeek = games => {
  const group = {};

  games.forEach(game => {
    const date = moment(game.startdate);
    const _key = date.format('W');

    if (!group[_key]) {
      group[_key] = {
        month: _key,
        label: date.format('W'),
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
    .sort((a, b) => (new Date(a[1]).getTime()) - (new Date(b[1]).getTime()));

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
