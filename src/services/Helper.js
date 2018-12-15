export const normalizeValue = (value, property, inverted) => {
  const range = property.max.value - property.min.value;
  const steps = range / 10;
  const overMin = value - property.min.value;
  const rating = Math.max(1, Math.ceil(overMin / steps));

  return inverted ? 11 - rating : rating;
};

export const getFactor = (value, min, max, inverse) => {
  const range = max - min;

  if (range === 0) {
    return 0;
  }

  const overMin = value - min;
  const factor = overMin / range;

  return inverse ? 1 - factor : factor;
};

export const getScore = score => {
  const [p1, p2, p3, p4, p1Own, p2Own, p3Own, p4Own] = score;

  return [p1 + p2 + p3Own + p4Own, p3 + p4 + p1Own + p2Own];
};

export const avgTimeBetween = (end, _timings) => {
  const timings = [..._timings];
  const timeBetween = [];
  if (timings.length === 0 || timings[timings.length - 1] !== end) {
    timings.push(end);
  }

  timings.forEach((time, i) => {
    if (i === 0) {
      timeBetween.push(time);
    } else {
      timeBetween.push(time - timings[i - 1]);
    }
  });

  return timeBetween.reduce((sum, curr) => sum + curr, 0) / timings.length;
};

export const calcFactor = (ratingA, ratingB) => {
  const exponent = (ratingA - ratingB) / 750;

  return parseFloat((1 / (1 + 10 ** exponent)).toFixed(2));
};

export const calc2v2 = (ratingA, ratingB1, ratingB2) => {
  const ratingB = Math.round((ratingB1 + ratingB2) / 2);

  return calcFactor(ratingA, ratingB);
};

export const calcTeamElo = (ratingA, ratingB) => {
  let chance = calcFactor(ratingA, ratingB);
  const multiplier = 50;

  return [
    Math.round(chance * multiplier),
    Math.round(-1 * (1 - chance) * multiplier)
  ];
};

export const calcScore = (
  player,
  enemy1,
  enemy2,
  goals,
  goalsAgainst,
  isWinner
) => {
  let chance = calc2v2(player.elo, enemy1.elo, enemy2.elo);
  const multiplier = 50;
  let bonus = 1 + goals / 30;

  bonus *= 1 + (6 - goalsAgainst) / 30;

  if (!isWinner) {
    chance = -1 * (1 - chance);
    bonus = 1 - (bonus - 1);
  } else {
    const winStreakBonus = player.winStreak >= 3 ? 1.2 : 1;
    bonus *= winStreakBonus;
  }

  return Math.round(chance * Math.min(bonus, 1.5) * multiplier);
};

export const avgOrFallback = (a, b, fallback = 0) => {
  if (b === 0 || !b) {
    return fallback;
  }

  return a / b;
};
