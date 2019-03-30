function getWeek(dt) {
  const tdt = new Date(dt.valueOf());
  const dayn = (tdt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  const firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

export const getChartDataByKeyAndInterval = (
  games,
  playerId,
  property,
  interval,
  styles
) => {
  const gamesOfPlayer = games
    .filter(game => game.players[playerId])
    .sort((a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime());
  const groupedGames = groupGamesByInterval(gamesOfPlayer, interval);
  const keys = Object.keys(groupedGames).sort((a, b) => a - b);

  const labels = keys.map(key => groupedGames[key].label);
  const data = keys.map(key => {
    const group = groupedGames[key];
    return group.games[group.games.length - 1].players[playerId][property];
  });

  return {
    labels,
    datasets: [
      {
        ...styles,
        data
      }
    ]
  };
};

export const groupGamesByInterval = (games, interval) => {
  const group = {};

  const intervals = {
    day: {
      getKey: g =>
        `${g.startdate.getFullYear()}-${g.startdate.getMonth() +
          1}-${g.startdate.getDate()}`,
      getLabel: g => `${g.startdate.getDate()}.${g.startdate.getMonth() + 1}`
    },
    week: {
      getKey: g => getWeek(g.startdate),
      getLabel: g => getWeek(g.startdate)
    }
  };

  games.forEach(game => {
    const intervalType = intervals[interval];
    const key = intervalType.getKey(game);
    if (!group[key]) {
      group[key] = {
        key,
        label: intervalType.getLabel(game),
        date: game.startdate,
        games: []
      };
    }

    group[key].games.push(game);
  });

  return group;
};

export const combineChartData = dataSets => {
  return {
    datasets: [...dataSets.map(e => e.datasets[0])],
    labels: dataSets[0].labels
  };
};
