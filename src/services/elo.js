import { getGames, getPlayers, getPlayerById } from '../helper';
import { FRONT_PLAYER, REAR_PLAYER } from '../constants';

export const calcFactor = (ratingA, ratingB) => {
  const exponent = (ratingA - ratingB) / 600;

  let factor = parseFloat((1 / (1 + Math.pow(10, exponent))).toFixed(2));
  factor = Math.min(Math.max(0.25, factor), 0.75);

  return factor
};

export const calc2v2 = (ratingA1, ratingA2, ratingB1, ratingB2) => {
  const ratingB = Math.round((ratingB1 + ratingB2) / 2);

  const chanceA2 = calcFactor(ratingA2, ratingB) * 0.3;
  const chanceA1 = calcFactor(ratingA1, ratingB) * 0.7;

  return chanceA1 + chanceA2;
}

export const calcScore = (p1, p2, p3, p4, game) => {
  let chance = calc2v2(p1.elo, p2.elo, p3.elo, p4.elo);

  let multiplier = 50;

  const goals = game.getGoalsByPlayer(p1.id).length;
  let bonus = (1 + (goals / 30));
  const score = game.getScore();
  const goalAgainst = p1.isWinner ? score.loser : score.winner;

  bonus *= (1 + ((6 - goalAgainst) / 30));

  if (!p1.isWinner) {
    chance = -1 * (1 - chance);
    bonus = 1 - (bonus - 1);
  }

  console.log(p1.id, p1.elo, p1.isWinner, game.getGoalsByPlayer(p1.id).length, chance, bonus, Math.round(chance * multiplier * bonus));

  return Math.round(chance * multiplier * bonus);
}

export const calcPlayerElos = () => {
  const games = getGames();
  const playerElos = {};
  getPlayers().forEach(player => {
    playerElos[player.id] = 1500;
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

    playerElos[p1.id] += calcScore(p1, p2, p3, p4, game);
    playerElos[p2.id] += calcScore(p2, p1, p3, p4, game);
    playerElos[p3.id] += calcScore(p3, p4, p1, p2, game);
    playerElos[p4.id] += calcScore(p4, p3, p2, p2, game);
  });

  return playerElos;
}