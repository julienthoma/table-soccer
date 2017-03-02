import { getGames, getPlayers, getPlayerById } from '../helper';

export const calcFactor = (ratingA, ratingB) => {
  const exponent = (ratingA - ratingB) / 500;

  let factor = parseFloat((1 / (1 + Math.pow(10, exponent))).toFixed(2));
  factor = Math.min(Math.max(0.25, factor), 0.75);

  return factor;
};

export const calc2v2 = (ratingA1, ratingA2, ratingB1, ratingB2) => {
  const ratingB = Math.round((ratingB1 + ratingB2) / 2);
  const chanceA2 = calcFactor(ratingA2, ratingB) * 0.25;
  const chanceA1 = calcFactor(ratingA1, ratingB) * 0.85;

  return chanceA1 + chanceA2;
}

export const calcScore = (p1, p2, p3, p4, game) => {
  let chance = calc2v2(p1.elo, p2.elo, p3.elo, p4.elo);
  let multiplier = 50;
  const goals = game.getGoalsByPlayer(p1.id).length;
  let bonus = (1 + (goals / 30));
  const score = game.getScore();
  const goalAgainst = p1.isWinner ? score.loser : score.winner;
  const winStreakBonus = p1.winStreak >= 3 ? 1.3 : 1;

  bonus *= (1 + ((6 - goalAgainst) / 25));
  bonus *= winStreakBonus;

  if (!p1.isWinner) {
    chance = -1 * (1 - chance);
    bonus = 1 - (bonus - 1);
  }

  return Math.round(chance * multiplier * bonus);
}

export const calcGameElos = () => {
  const games = getGames();
  const playerElos = {};
  const playerWinstreak = {};
  const gameElos = {};
  getPlayers().forEach(player => {
    playerElos[player.id] = 1500;
    playerWinstreak[player.id] = 0;
  });

  games.items.forEach(game => {
    const players = game.getPlayers().map(player => {
      const _player = getPlayerById(player.id);
      _player.elo = playerElos[player.id];

      return _player;
    });
    const [p1, p2, p3, p4] = players;

    p1.isWinner = true;
    p2.isWinner = true;
    p3.isWinner = false;
    p4.isWinner = false;

    playerWinstreak[p1.id]++;
    playerWinstreak[p2.id]++;
    playerWinstreak[p3.id] = 0;
    playerWinstreak[p4.id] = 0;

    p1.winStreak = playerWinstreak[p1.id];
    p2.winStreak = playerWinstreak[p2.id];
    p3.winStreak = playerWinstreak[p3.id];
    p4.winStreak = playerWinstreak[p4.id];

    const p1EloGain = calcScore(p1, p2, p3, p4, game);
    const p2EloGain = calcScore(p2, p1, p3, p4, game);
    const p3EloGain = calcScore(p3, p4, p1, p2, game);
    const p4EloGain = calcScore(p4, p3, p1, p2, game);

    playerElos[p1.id] += p1EloGain;
    playerElos[p2.id] += p2EloGain;
    playerElos[p3.id] += p3EloGain;
    playerElos[p4.id] += p4EloGain;

    gameElos[game.id] = {
      total: {
        [p1.id]: playerElos[p1.id],
        [p2.id]: playerElos[p2.id],
        [p3.id]: playerElos[p3.id],
        [p4.id]: playerElos[p4.id]
      },
      gain: {
        [p1.id]: p1EloGain,
        [p2.id]: p2EloGain,
        [p3.id]: p3EloGain,
        [p4.id]: p4EloGain
      },
      winStreak: {
        [p1.id]: p1.winStreak,
        [p2.id]: p2.winStreak,
        [p3.id]: p3.winStreak,
        [p4.id]: p4.winStreak
      }
    }
  });

  return gameElos;
}