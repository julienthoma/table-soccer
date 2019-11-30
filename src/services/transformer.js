/* eslint no-param-reassign: 0 */
'use-strict';
import Game from '../entities/Game';
import Player from '../entities/Player';
import {
  calcScore,
  avgOrFallback,
  avgOrFirstParameter,
  calcTeamElo
} from './Helper';
import {
  POSITION_STRIKER,
  POSITION_MIDFILED,
  POSITION_DEFENSE,
  POSITION_KEEPER,
  ATTACK_PLAYER,
  DEFENSE_PLAYER
} from '../constants';

export const transform = data => {
  const playerMap = {};
  const games = [];
  const teams = {};
  const properties = {};
  const rawGames = Object.keys(data.games || {}).map(key => data.games[key]);
  const players = Object.keys(data.players).map(
    key => new Player(data.players[key])
  );
  players.forEach(player => (playerMap[player.id] = player));

  rawGames
    .sort((a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime())
    .forEach(([gameId, startdate, duration, playersIds, scores, timeline]) => {
      const [winAttackId, winDefId, losAttackId, losDefId] = playersIds;
      const winnerAttack = createPlayer(playerMap[winAttackId], scores, 0);
      const winnerDefense = createPlayer(playerMap[winDefId], scores, 1);
      const loserAttack = createPlayer(playerMap[losAttackId], scores, 2);
      const loserDefense = createPlayer(playerMap[losDefId], scores, 3);

      const currentPlayers = {
        [winAttackId]: winnerAttack,
        [winDefId]: winnerDefense,
        [losAttackId]: loserAttack,
        [losDefId]: loserDefense
      };

      evaluateTimeLine(
        timeline,
        winnerAttack,
        winnerDefense,
        loserDefense,
        currentPlayers
      );

      const [winnerTeam, loserTeam] = createOrGetTeams(
        [winnerAttack, winnerDefense, loserAttack, loserDefense],
        teams
      );

      playersIds.forEach((id, posIndex) => {
        const currentGamePlayer = currentPlayers[id];
        createPlayerCurrentGameStats(currentGamePlayer, posIndex, scores);
        const goalsPosStriker =
          playerMap[id].goalsPosStriker + currentPlayers[id][POSITION_STRIKER];
        const goalsPosMidfield =
          playerMap[id].goalsPosMidfield +
          currentPlayers[id][POSITION_MIDFILED];
        const goalsPosDefense =
          playerMap[id].goalsPosDefense + currentPlayers[id][POSITION_DEFENSE];
        const goalsPosKeeper =
          playerMap[id].goalsPosKeeper + currentPlayers[id][POSITION_KEEPER];
        const ownGoals = playerMap[id].ownGoals + currentPlayers[id].ownGoals;
        const position = posIndex % 2 === 0 ? ATTACK_PLAYER : DEFENSE_PLAYER;
        const isAttack = position === ATTACK_PLAYER;
        const isWinner = posIndex <= 1;
        const winStreak = isWinner ? playerMap[id].winStreak + 1 : 0;
        const longestWinStreak =
          winStreak > playerMap[id].longestWinStreak
            ? winStreak
            : playerMap[id].longestWinStreak;
        const wins = isWinner ? playerMap[id].wins + 1 : playerMap[id].wins;
        const winsAttack =
          isWinner && isAttack
            ? playerMap[id].winsAttack + 1
            : playerMap[id].winsAttack;
        const winsDefense =
          isWinner && !isAttack
            ? playerMap[id].winsDefense + 1
            : playerMap[id].winsDefense;
        const losses = !isWinner
          ? playerMap[id].losses + 1
          : playerMap[id].losses;
        const lossesAttack =
          !isWinner && isAttack
            ? playerMap[id].lossesAttack + 1
            : playerMap[id].lossesAttack;
        const lossesDefense =
          !isWinner && !isAttack
            ? playerMap[id].lossesDefense + 1
            : playerMap[id].lossesDefense;

        const ownGoalsAttack = isAttack
          ? playerMap[id].ownGoalsAttack + currentPlayers[id].ownGoals
          : playerMap[id].ownGoalsAttack;
        const ownGoalsDefense = !isAttack
          ? playerMap[id].ownGoalsDefense + currentPlayers[id].ownGoals
          : playerMap[id].ownGoalsDefense;
        const numOfGames = wins + losses;
        const gamesAttack = winsAttack + lossesAttack;
        const gamesDefense = winsDefense + lossesDefense;
        const avgGoalsPosStriker = avgOrFallback(goalsPosStriker, gamesAttack);
        const avgGoalsPosMidfield = avgOrFallback(
          goalsPosMidfield,
          gamesAttack
        );
        const avgGoalsPosDefense = avgOrFallback(goalsPosDefense, gamesDefense);
        const avgGoalsPosKeeper = avgOrFallback(goalsPosKeeper, gamesDefense);
        const currentGoals = currentPlayers[id].score;
        const goalsAgainst = isWinner
          ? loserAttack.score + loserDefense.score
          : winnerAttack.score + winnerDefense.score;
        const goalsAgainstDefense = !isAttack
          ? playerMap[id].goalsAgainstDefense + goalsAgainst
          : playerMap[id].goalsAgainstDefense;
        const avgGoalsAgainstDefense = avgOrFallback(
          goalsAgainstDefense,
          winsDefense
        );
        const goals = playerMap[id].goals + currentGoals;
        const goalsAttack = isAttack
          ? playerMap[id].goalsAttack + currentGoals
          : playerMap[id].goalsAttack;
        const goalsWinnerAttack =
          isWinner && isAttack
            ? playerMap[id].goalsWinnerAttack + currentGoals
            : playerMap[id].goalsWinnerAttack;
        const avgGoalsWinnerAttack = avgOrFallback(
          goalsWinnerAttack,
          winsAttack
        );
        const goalsDefense = !isAttack
          ? playerMap[id].goalsDefense + currentGoals
          : playerMap[id].goalsDefense;
        const playTime = playerMap[id].playTime + duration;
        const avgGameDuration = playTime / numOfGames;
        const playTimeAttack = isAttack
          ? playerMap[id].playTimeAttack + duration
          : playerMap[id].playTimeAttack;
        const playTimeDefense = !isAttack
          ? playerMap[id].playTimeDefense + duration
          : playerMap[id].playTimeDefense;
        const winsAttackDuration =
          isWinner && isAttack
            ? playerMap[id].winsAttackDuration + duration
            : playerMap[id].winsAttackDuration;
        const avgWinsAttackDuration = avgOrFallback(
          winsAttackDuration,
          winsAttack
        );
        const lossDefenseDuration =
          !isWinner && !isAttack
            ? playerMap[id].lossDefenseDuration + duration
            : playerMap[id].lossDefenseDuration;
        const avgLossDefenseDuration = avgOrFallback(
          lossDefenseDuration,
          lossesDefense
        );
        const winRatio = avgOrFallback(wins, numOfGames);
        const winRatioAttack = avgOrFallback(winsAttack, gamesAttack);
        const winRatioDefense = avgOrFallback(winsDefense, gamesDefense);
        const avgOwnGoals = avgOrFallback(ownGoals, numOfGames);

        const currentAvgTimeBetweenGoals = isAttack
          ? avgOrFirstParameter(duration, currentGoals)
          : null;
        const totalAvgTimeBetweenGoals = isAttack
          ? playerMap[id].totalAvgTimeBetweenGoals + currentAvgTimeBetweenGoals
          : playerMap[id].totalAvgTimeBetweenGoals;

        const avgTimeBetweenGoals = avgOrFirstParameter(
          playTimeAttack,
          goalsAttack
        );

        const currentAvgTimeBetweenGoalsAgainst = !isAttack
          ? avgOrFirstParameter(duration, goalsAgainst)
          : null;
        const totalAvgTimeBetweenGoalsAgainst = !isAttack
          ? playerMap[id].totalAvgTimeBetweenGoalsAgainst +
            currentAvgTimeBetweenGoalsAgainst
          : playerMap[id].totalAvgTimeBetweenGoalsAgainst;
        const avgTimeBetweenGoalsAgainst = avgOrFirstParameter(
          playTimeDefense,
          goalsAgainstDefense
        );

        const placemnentFinished = numOfGames >= 10;

        let enemy1Id;
        let enemy2Id;

        if (isWinner) {
          enemy1Id = losAttackId;
          enemy2Id = losDefId;
        } else {
          enemy1Id = winAttackId;
          enemy2Id = winDefId;
        }

        const eloGain = calcScore(
          playerMap[id],
          playerMap[enemy1Id],
          playerMap[enemy2Id],
          currentGoals,
          goalsAgainst,
          isWinner
        );
        const newElo = playerMap[id].elo + eloGain;

        currentPlayers[id].winStreak = winStreak;
        currentPlayers[id].wins = wins;
        currentPlayers[id].losses = losses;
        currentPlayers[id].games = numOfGames;
        currentPlayers[id].goals = goals;
        currentPlayers[id].elo = newElo;
        currentPlayers[id].eloGain = eloGain;
        currentPlayers[id].avgTimeBetweenGoals = avgTimeBetweenGoals;
        currentPlayers[
          id
        ].avgTimeBetweenGoalsAgainst = avgTimeBetweenGoalsAgainst;
        currentPlayers[id].photoURL = playerMap[id].photoURL;

        playerMap[id].ownGoals = ownGoals;
        playerMap[id].goalsPosStriker = goalsPosStriker;
        playerMap[id].goalsPosMidfield = goalsPosMidfield;
        playerMap[id].goalsPosDefense = goalsPosDefense;
        playerMap[id].goalsPosKeeper = goalsPosKeeper;
        playerMap[id].winStreak = winStreak;
        playerMap[id].winStreak = winStreak;
        playerMap[id].wins = wins;
        playerMap[id].winsAttack = winsAttack;
        playerMap[id].winsDefense = winsDefense;
        playerMap[id].losses = losses;
        playerMap[id].lossesAttack = lossesAttack;
        playerMap[id].lossesDefense = lossesDefense;
        playerMap[id].ownGoalsAttack = ownGoalsAttack;
        playerMap[id].ownGoalsDefense = ownGoalsDefense;
        playerMap[id].games = numOfGames;
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
        playerMap[id].avgGoalsPosStriker = avgGoalsPosStriker;
        playerMap[id].avgGoalsPosMidfield = avgGoalsPosMidfield;
        playerMap[id].avgGoalsPosDefense = avgGoalsPosDefense;
        playerMap[id].avgGoalsPosKeeper = avgGoalsPosKeeper;
        playerMap[id].avgOwnGoals = avgOwnGoals;
        playerMap[id].longestWinStreak = longestWinStreak;
        playerMap[id].totalAvgTimeBetweenGoals = totalAvgTimeBetweenGoals;
        playerMap[id].avgTimeBetweenGoals = avgTimeBetweenGoals;
        playerMap[
          id
        ].totalAvgTimeBetweenGoalsAgainst = totalAvgTimeBetweenGoalsAgainst;
        playerMap[id].avgTimeBetweenGoalsAgainst = avgTimeBetweenGoalsAgainst;
        playerMap[id].placemnentFinished = placemnentFinished;
        playerMap[id].avgGameDuration = avgGameDuration;
      });

      games.push(
        new Game({
          id: gameId,
          startdate: new Date(startdate),
          duration,
          timeline,
          winnerScore:
            winnerAttack.score +
            winnerDefense.score +
            loserAttack.ownGoals +
            loserDefense.ownGoals,
          loserScore:
            loserAttack.score +
            loserDefense.score +
            winnerAttack.ownGoals +
            winnerDefense.ownGoals,
          winnerAttack,
          winnerDefense,
          loserAttack,
          loserDefense,
          players: currentPlayers,
          winnerTeamKey: winnerTeam.id,
          loserTeamKey: loserTeam.id,
          [winnerTeam.id]: {
            ...winnerTeam,
            attack: winnerAttack,
            defense: winnerDefense
          },
          [loserTeam.id]: {
            ...loserTeam,
            attack: loserAttack,
            defense: loserDefense
          }
        })
      );
    });

  players.forEach(player => {
    const checkedProps = [
      'avgGoalsPosStriker',
      'avgGoalsPosMidfield',
      'avgGoalsPosDefense',
      'avgGoalsPosKeeper',
      'avgTimeBetweenGoals',
      'avgTimeBetweenGoalsAgainst'
    ];

    if (player.id === 'guest' || !player.placemnentFinished) {
      return;
    }

    checkedProps.forEach(prop => {
      if (!properties[prop]) {
        properties[prop] = {
          min: {
            value: Infinity
          },
          max: {
            value: 0
          }
        };
      }

      if (player[prop] <= properties[prop].min.value) {
        properties[prop].min = {
          value: player[prop],
          id: player.id
        };
      }

      if (player[prop] >= properties[prop].max.value) {
        properties[prop].max = {
          value: player[prop],
          id: player.id
        };
      }
    });
  });

  for (let i = 0, len = players.length; i < len; i++) {
    players[i].selectionIndex = i;
  }

  return { players, games, teams, properties };
};

function createPlayer({ id, name }, scores, index) {
  return {
    id,
    name,
    score: scores[index],
    ownGoals: scores[index + 4],
    goalAgainstTimings: [],
    goalTimings: [],
    ownGoalTimings: [],
    [POSITION_STRIKER]: 0,
    [POSITION_MIDFILED]: 0,
    [POSITION_DEFENSE]: 0,
    [POSITION_KEEPER]: 0
  };
}

function createPlayerCurrentGameStats(player, posIndex, scores) {
  const [winAttGoals, winDefGoals, losAttGoals, losDefGoals] = scores;
  player.position = posIndex % 2 === 0 ? ATTACK_PLAYER : DEFENSE_PLAYER;
  player.isAttack = player.position === ATTACK_PLAYER;
  player.isWinner = posIndex <= 1;
  player.goalsPosStriker = player[POSITION_STRIKER];
  player.goalsPosMidfield = player[POSITION_MIDFILED];
  player.goalsPosDefense = player[POSITION_DEFENSE];
  player.goalsPosKeeper = player[POSITION_KEEPER];
  player.currentGoals = player.score;
  player.ownGoalsAttack = player.isAttack ? player.ownGoals : 0;
  player.ownGoalsDefense = !player.isAttack ? player.ownGoals : 0;
  player.goalsAgainst = player.isWinner
    ? losAttGoals + losDefGoals
    : winAttGoals + winDefGoals;
  player.goalsAgainstDefense = !player.isAttack ? player.goalsAgainst : 0;
}

function evaluateTimeLine(
  timeline,
  winnerAttack,
  winnerDefense,
  loserDefense,
  currentPlayers
) {
  timeline.forEach((timelineItem, i) => {
    const { id: playerId, index, position, ownGoal, time } = timelineItem;
    const currentPlayer = currentPlayers[playerId];
    const isWinner =
      playerId === winnerAttack.id || playerId === winnerDefense.id;
    let score;

    if (i === 0) {
      score = [0, 0];
    } else {
      score = [...timeline[i - 1].score];
    }

    if ((isWinner && !ownGoal) || (!isWinner && ownGoal)) {
      score[0]++;
    } else {
      score[1]++;
    }

    timelineItem.score = score;
    timelineItem.name = currentPlayer.name;

    let currentKeeper;

    if (index <= 1) {
      currentKeeper = ownGoal ? winnerDefense : loserDefense;
    } else {
      currentKeeper = ownGoal ? loserDefense : winnerDefense;
    }

    if (!ownGoal) {
      currentPlayer[position]++;
      if (index % 2 === 0) {
        currentPlayer.goalTimings.push(time);
      }
    }

    currentKeeper.goalAgainstTimings.push(time);
    currentPlayer.index = index;
  });
}

function createOrGetTeams(_players, _teams) {
  const [winnerAttack, winnerDefense, loserAttack, loserDefense] = _players;
  const winnerTeamKey = `${winnerAttack.id}-${winnerDefense.id}`;
  const loserTeamKey = `${loserAttack.id}-${loserDefense.id}`;

  if (!_teams[winnerTeamKey]) {
    _teams[winnerTeamKey] = {
      elo: 1500,
      id: winnerTeamKey,
      goals: 0,
      games: 0,
      wins: 0,
      losses: 0,
      attack: winnerAttack,
      defense: winnerDefense
    };
  }

  if (!_teams[loserTeamKey]) {
    _teams[loserTeamKey] = {
      elo: 1500,
      id: loserTeamKey,
      games: 0,
      wins: 0,
      losses: 0,
      attack: loserAttack,
      defense: loserDefense
    };
  }

  const winnerTeam = _teams[winnerTeamKey];
  const loserTeam = _teams[loserTeamKey];
  const [winnerTeamEloGain, loserTeamEloGain] = calcTeamElo(
    winnerTeam.elo,
    loserTeam.elo
  );
  winnerTeam.elo = winnerTeam.elo + winnerTeamEloGain;
  loserTeam.elo = loserTeam.elo + loserTeamEloGain;
  winnerTeam.games++;
  winnerTeam.wins++;
  winnerTeam.winRatio = avgOrFallback(winnerTeam.wins, winnerTeam.games);
  loserTeam.games++;
  loserTeam.losses++;
  loserTeam.winRatio = avgOrFallback(loserTeam.wins, loserTeam.games);

  return [winnerTeam, loserTeam];
}
