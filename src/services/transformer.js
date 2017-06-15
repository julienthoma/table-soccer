import Game from '../entities/Game';
import Player from '../entities/Player';
import * as consts from '../constants';

export const transform = data => {
  const _players = Object.keys(data.players).map(
    key => new Player(data.players[key])
  );
  const playerMap = {};
  _players.forEach(player => {
    playerMap[player.id] = player;
  });

  const rawGames = Object.keys(data.games).map(key => data.games[key]);
  const games = [];
  const properties = {};

  rawGames
    .sort((a, b) => {
      const dateA = new Date(a[1]);
      const dateB = new Date(b[1]);

      return dateA.getTime() - dateB.getTime();
    })
    .forEach(([_id, startdate, duration, players, scores, timeline]) => {
      const [
        winnerAttackId,
        winnerDefenseId,
        loserAttackId,
        loserDefenseId
      ] = players;

      const [
        winnerAttackScore,
        winnerDefenseScore,
        loserAttackScore,
        loserDefenseScore
      ] = scores;

      const winnerAttack = {
        id: playerMap[winnerAttackId].id,
        name: playerMap[winnerAttackId].name,
        score: winnerAttackScore
      };
      const winnerDefense = {
        id: playerMap[winnerDefenseId].id,
        name: playerMap[winnerDefenseId].name,
        score: winnerDefenseScore
      };
      const loserAttack = {
        id: playerMap[loserAttackId].id,
        name: playerMap[loserAttackId].name,
        score: loserAttackScore
      };
      const loserDefense = {
        id: playerMap[loserDefenseId].id,
        name: playerMap[loserDefenseId].name,
        score: loserDefenseScore
      };

      const currentPlayers = {
        [winnerAttackId]: {
          ...winnerAttack
        },
        [winnerDefenseId]: {
          ...winnerDefense
        },
        [loserAttackId]: {
          ...loserAttack
        },
        [loserDefenseId]: {
          ...loserDefense
        }
      };

      players.forEach((id, i) => {
        const position = i % 2 === 0
          ? consts.ATTACK_PLAYER
          : consts.DEFENSE_PLAYER;
        const isAttack = position === consts.ATTACK_PLAYER;
        const isWinner = i <= 1;
        const winStreak = isWinner ? playerMap[id].winStreak + 1 : 0;
        const wins = isWinner ? playerMap[id].wins + 1 : playerMap[id].wins;
        const winsAttack = isWinner && isAttack
          ? playerMap[id].winsAttack + 1
          : playerMap[id].winsAttack;
        const winsDefense = isWinner && !isAttack
          ? playerMap[id].winsDefense + 1
          : playerMap[id].winsDefense;
        const losses = !isWinner
          ? playerMap[id].losses + 1
          : playerMap[id].losses;
        const lossesAttack = !isWinner && isAttack
          ? playerMap[id].lossesAttack + 1
          : playerMap[id].lossesAttack;
        const lossesDefense = !isWinner && !isAttack
          ? playerMap[id].lossesDefense + 1
          : playerMap[id].lossesDefense;
        const _games = wins + losses;
        const gamesAttack = winsAttack + lossesAttack;
        const gamesDefense = winsDefense + lossesDefense;
        const currentGoals = currentPlayers[id].score;
        const goalsAgainst = isWinner
          ? loserAttackScore + loserDefenseScore
          : winnerAttackScore + winnerDefenseScore;
        const goalsAgainstDefense = isWinner && !isAttack
          ? playerMap[id].goalsAgainstDefense + goalsAgainst
          : playerMap[id].goalsAgainstDefense;
        const avgGoalsAgainstDefense = goalsAgainstDefense / winsDefense;
        const goals = playerMap[id].goals + currentGoals;
        const goalsAttack = isAttack
          ? playerMap[id].goalsAttack + currentGoals
          : playerMap[id].goalsAttack;
        const goalsWinnerAttack = isWinner && isAttack
          ? playerMap[id].goalsWinnerAttack + currentGoals
          : playerMap[id].goalsWinnerAttack;
        const avgGoalsWinnerAttack = goalsWinnerAttack / winsAttack;
        const goalsDefense = !isAttack
          ? playerMap[id].goalsDefense + currentGoals
          : playerMap[id].goalsDefense;
        const playTime = playerMap[id].playTime + duration;
        const playTimeAttack = isAttack
          ? playerMap[id].playTimeAttack + duration
          : playerMap[id].playTimeAttack;
        const playTimeDefense = !isAttack
          ? playerMap[id].playTimeDefense + duration
          : playerMap[id].playTimeDefense;
        const winsAttackDuration = isWinner && isAttack
          ? playerMap[id].winsAttackDuration + duration
          : playerMap[id].winsAttackDuration;
        const avgWinsAttackDuration = winsAttackDuration / winsAttack;
        const lossDefenseDuration = !isWinner && !isAttack
          ? playerMap[id].lossDefenseDuration + duration
          : playerMap[id].lossDefenseDuration;
        const avgLossDefenseDuration = lossDefenseDuration / lossesDefense;
        const winRatio = wins > 0 ? wins / _games : 0;
        const winRatioAttack = wins > 0 ? winsAttack / gamesAttack : 0;
        const winRatioDefense = wins > 0 ? winsDefense / gamesDefense : 0;

        let teamMateId;
        let enemy1Id;
        let enemy2Id;

        if (isWinner) {
          teamMateId = isAttack ? winnerDefenseId : winnerAttackId;
          enemy1Id = loserAttackId;
          enemy2Id = loserDefenseId;
        } else {
          teamMateId = isAttack ? loserDefenseId : loserAttackId;
          enemy1Id = winnerAttackId;
          enemy2Id = loserAttackId;
        }

        const eloGain = calcScore(
          playerMap[id],
          playerMap[teamMateId],
          playerMap[enemy1Id],
          playerMap[enemy2Id],
          currentGoals,
          goalsAgainst,
          isWinner
        );
        const newElo = playerMap[id].elo + eloGain;

        currentPlayers[id].winStreak = winStreak;
        currentPlayers[id].isWinner = isWinner;
        currentPlayers[id].position = position;
        currentPlayers[id].winStreak = winStreak;
        currentPlayers[id].wins = wins;
        currentPlayers[id].losses = losses;
        currentPlayers[id].games = _games;
        currentPlayers[id].goals = goals;
        currentPlayers[id].elo = newElo;
        currentPlayers[id].eloGain = eloGain;

        playerMap[id].winStreak = winStreak;
        playerMap[id].wins = wins;
        playerMap[id].winsAttack = winsAttack;
        playerMap[id].winsDefense = winsDefense;
        playerMap[id].losses = losses;
        playerMap[id].lossesAttack = lossesAttack;
        playerMap[id].lossesDefense = lossesDefense;
        playerMap[id].games = _games;
        playerMap[id].gamesAttack = gamesAttack;
        playerMap[id].gamesDefense = gamesDefense;
        playerMap[id].goals = goals;
        playerMap[id].goalsAttack = goalsAttack;
        playerMap[id].goalsDefense = goalsDefense;
        playerMap[id].elo = newElo;
        playerMap[id].goalsAgainst = goalsAgainst;
        playerMap[id].playTime = playTime;
        playerMap[id].playTimeAttack = playTimeAttack;
        playerMap[id].playTimeDefense = playTimeDefense;
        playerMap[id].winsAttackDuration = winsAttackDuration;
        playerMap[id].avgWinsAttackDuration = avgWinsAttackDuration;
        playerMap[id].lossDefenseDuration = lossDefenseDuration;
        playerMap[id].avgLossDefenseDuration = avgLossDefenseDuration;
        playerMap[id].winRatio = winRatio;
        playerMap[id].winRatioAttack = winRatioAttack;
        playerMap[id].winRatioDefense = winRatioDefense;
        playerMap[id].goalsWinnerAttack = goalsWinnerAttack;
        playerMap[id].avgGoalsWinnerAttack = avgGoalsWinnerAttack;
        playerMap[id].goalsAgainstDefense = goalsAgainstDefense;
        playerMap[id].avgGoalsAgainstDefense = avgGoalsAgainstDefense;
      });

      games.push(
        new Game({
          id: _id,
          startdate: new Date(startdate),
          duration,
          timeline,
          winnerScore: winnerAttackScore + winnerDefenseScore,
          loserScore: loserAttackScore + loserDefenseScore,
          winnerAttack,
          winnerDefense,
          loserAttack,
          loserDefense,
          players: currentPlayers
        })
      );
    });

  _players.forEach(_player => {
    const checkedProps = [
      'elo',
      'avgWinsAttackDuration',
      'avgGoalsWinnerAttack',
      'winRatioAttack',
      'winRatioDefense',
      'avgLossDefenseDuration',
      'avgGoalsAgainstDefense'
    ];

    if (_player.id === 'guest') {
      return;
    }

    checkedProps.forEach(prop => {
      if (!properties[prop]) {
        properties[prop] = {
          min: {
            value: 999999999999
          },
          max: {
            value: 0
          }
        };
      }

      if (_player[prop] <= properties[prop].min.value) {
        properties[prop].min = {
          value: _player[prop],
          id: _player.id
        };
      }

      if (_player[prop] >= properties[prop].max.value) {
        properties[prop].max = {
          value: _player[prop],
          id: _player.id
        };
      }
    });
  });

  return {
    players: _players,
    games,
    properties
  };
};

function calc2v2(ratingA1, ratingA2, ratingB1, ratingB2) {
  const ratingB = Math.round((ratingB1 + ratingB2) / 2);
  const chanceA2 = calcFactor(ratingA2, ratingB) * 0.25;
  const chanceA1 = calcFactor(ratingA1, ratingB) * 0.85;

  return chanceA1 + chanceA2;
}

function calcScore(p1, p2, p3, p4, goals, goalsAgainst, isWinner) {
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
}

function calcFactor(ratingA, ratingB) {
  const exponent = (ratingA - ratingB) / 500;

  let factor = parseFloat((1 / (1 + 10 ** exponent)).toFixed(2));
  factor = Math.min(Math.max(0.25, factor), 0.75);

  return factor;
}
