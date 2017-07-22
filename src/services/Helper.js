export const normalizeValue = (value, property, inverted) => {
  const range = property.max.value - property.min.value;
  const steps = range / 10;
  const overMin = value - property.min.value;
  const rating = Math.max(1, Math.ceil(overMin / steps));

  return inverted ? 11 - rating : rating;
};

export const getFactor = (value, min, max, inverse) => {
  const range = max - min;
  const overMin = value - min;
  const factor = overMin / range;

  return inverse ? 1 - factor : factor;
};

function getWeek(dt) {
  const tdt = new Date(dt.valueOf());
  const dayn = (tdt.getDay() + 6) % 7;
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

  return { labels, data };
};

export const getScore = score => {
  const [p1, p2, p3, p4, p1Own, p2Own, p3Own, p4Own] = score;

  return [p1 + p2 + p3Own + p4Own, p3 + p4 + p1Own + p2Own];
};

export const avgTimeBetween = (end, _timings) => {
  const timings = [..._timings];
  const timeBetween = [];
  if (timings.lengtht === 0 || timings[timings.length - 1] !== end) {
    timings.push(end);
  }

  timings.forEach((time, i) => {
    if (i === 0) {
      return timeBetween.push(time);
    }

    timeBetween.push(time - timings[i - 1]);
  });

  return timeBetween.reduce((sum, curr) => sum + curr, 0) / timings.length;
};


export const calcFactor = (ratingA, ratingB) => {
  const exponent = (ratingA - ratingB) / 500;

  let factor = parseFloat((1 / (1 + 10 ** exponent)).toFixed(2));
  factor = Math.min(Math.max(0.25, factor), 0.75);

  return factor;
};

export const calc2v2 = (ratingA1, ratingA2, ratingB1, ratingB2) => {
  const ratingB = Math.round((ratingB1 + ratingB2) / 2);
  const chanceA2 = calcFactor(ratingA2, ratingB) * 0.25;
  const chanceA1 = calcFactor(ratingA1, ratingB) * 0.85;

  return chanceA1 + chanceA2;
};

export const calcScore = (p1, p2, p3, p4, goals, goalsAgainst, isWinner) => {
  let chance = calc2v2(p1.elo, p2.elo, p3.elo, p4.elo);
  const multiplier = 50;
  let bonus = 1 + goals / 30;
  const winStreakBonus = p1.winStreak >= 3 ? 1.3 : 1;

  bonus *= 1 + (6 - goalsAgainst) / 25;
  bonus *= winStreakBonus;

  if (!isWinner) {
    chance = -1 * (1 - chance);
    bonus = 1 - (bonus - 1);
  }

  return Math.round(chance * multiplier * bonus);
};
