/* eslint no-param-reassign: 0 */
import Game from '../entities/Game';
import Player from '../entities/Player';
import {
  avgTimeBetween,
  calcScore,
  avgOrFallback,
  calcTeamElo
} from './Helper';
import * as consts from '../constants';

export const transform = data => {
  const _players = Object.keys(data.players).map(
    key => new Player(data.players[key])
  );
  const playerMap = {};
  _players.forEach(player => playerMap[player.id] = player);

  const rawGames = Object.keys(data.games || {}).map(key => data.games[key]);
  const _games = [];
  const teams = {};
  const properties = {};

  rawGames
    .sort((a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime())
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
        loserDefenseScore,
        winnerAttackOwnGoals,
        winnerDefenseOwnGoals,
        loserAttackOwnGoals,
        loserDefenseOwnGoals
      ] = scores;

      const positionGoals = {
        [consts.POSITION_STRIKER]: 0,
        [consts.POSITION_MIDFILED]: 0,
        [consts.POSITION_DEFENSE]: 0,
        [consts.POSITION_KEEPER]: 0
      };

      const winnerAttack = {
        id: playerMap[winnerAttackId].id,
        name: playerMap[winnerAttackId].name,
        score: winnerAttackScore,
        ownGoals: winnerAttackOwnGoals,
        ...positionGoals,
        goalAgainstTimings: [],
        goalTimings: [],
        ownGoalTimings: []
      };
      const winnerDefense = {
        id: playerMap[winnerDefenseId].id,
        name: playerMap[winnerDefenseId].name,
        score: winnerDefenseScore,
        ownGoals: winnerDefenseOwnGoals,
        ...positionGoals,
        goalAgainstTimings: [],
        goalTimings: [],
        ownGoalTimings: []
      };
      const loserAttack = {
        id: playerMap[loserAttackId].id,
        name: playerMap[loserAttackId].name,
        score: loserAttackScore,
        ownGoals: loserAttackOwnGoals,
        ...positionGoals,
        goalAgainstTimings: [],
        goalTimings: [],
        ownGoalTimings: []
      };
      const loserDefense = {
        id: playerMap[loserDefenseId].id,
        name: playerMap[loserDefenseId].name,
        score: loserDefenseScore,
        ownGoals: loserDefenseOwnGoals,
        ...positionGoals,
        goalAgainstTimings: [],
        goalTimings: [],
        ownGoalTimings: []
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

      timeline.forEach((item, i) => {
        const {
          id, index, position, ownGoal, time
        } = item;
        const _isWinner = id === winnerAttackId || id === winnerDefenseId;
        let score;

        if (i === 0) {
          score = [0, 0];
        } else {
          score = [...timeline[i - 1].score];
        }

        if ((_isWinner && !ownGoal) || (!_isWinner && ownGoal)) {
          score[0]++;
        } else {
          score[1]++;
        }

        item.score = score;
        item.name = playerMap[id].name;

        let currentKeeper;

        if (index <= 1) {
          currentKeeper = ownGoal
            ? currentPlayers[winnerDefenseId]
            : currentPlayers[loserDefenseId];
        } else {
          currentKeeper = ownGoal
            ? currentPlayers[loserDefenseId]
            : currentPlayers[winnerDefenseId];
        }

        if (!ownGoal) {
          currentPlayers[id][position]++;
          if (index % 2 === 0) {
            currentPlayers[id].goalTimings.push(time);
          }
        }

        currentKeeper.goalAgainstTimings.push(time);
        currentPlayers[id].index = index;
      });

      const [winnerTeam, loserTeam] = createOrGetTeams(
        [winnerAttack, winnerDefense, loserAttack, loserDefense],
        teams
      );

      players.forEach((id, i) => {
        const goalsPosStriker = playerMap[id].goalsPosStriker
          + currentPlayers[id][consts.POSITION_STRIKER];
        const goalsPosMidfield = playerMap[id].goalsPosMidfield
          + currentPlayers[id][consts.POSITION_MIDFILED];
        const goalsPosDefense = playerMap[id].goalsPosDefense
          + currentPlayers[id][consts.POSITION_DEFENSE];
        const goalsPosKeeper = playerMap[id].goalsPosKeeper
          + currentPlayers[id][consts.POSITION_KEEPER];
        const ownGoals = playerMap[id].ownGoals + currentPlayers[id].ownGoals;
        const position = i % 2 === 0
          ? consts.ATTACK_PLAYER
          : consts.DEFENSE_PLAYER;
        const isAttack = position === consts.ATTACK_PLAYER;
        const isWinner = i <= 1;
        const winStreak = isWinner ? playerMap[id].winStreak + 1 : 0;
        const longestWinStreak = winStreak > playerMap[id].longestWinStreak
          ? winStreak
          : playerMap[id].longestWinStreak;
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

        const ownGoalsAttack = isAttack
          ? playerMap[id].ownGoalsAttack + currentPlayers[id].ownGoals
          : playerMap[id].ownGoalsAttack;
        const ownGoalsDefense = !isAttack
          ? playerMap[id].ownGoalsDefense + currentPlayers[id].ownGoals
          : playerMap[id].ownGoalsDefense;
        const games = wins + losses;
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
          ? loserAttackScore + loserDefenseScore
          : winnerAttackScore + winnerDefenseScore;
        const goalsAgainstDefense = isWinner && !isAttack
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
        const goalsWinnerAttack = isWinner && isAttack
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
        const avgGameDuration = playTime / games;
        const playTimeAttack = isAttack
          ? playerMap[id].playTimeAttack + duration
          : playerMap[id].playTimeAttack;
        const playTimeDefense = !isAttack
          ? playerMap[id].playTimeDefense + duration
          : playerMap[id].playTimeDefense;
        const winsAttackDuration = isWinner && isAttack
          ? playerMap[id].winsAttackDuration + duration
          : playerMap[id].winsAttackDuration;
        const avgWinsAttackDuration = avgOrFallback(
          winsAttackDuration,
          winsAttack
        );
        const lossDefenseDuration = !isWinner && !isAttack
          ? playerMap[id].lossDefenseDuration + duration
          : playerMap[id].lossDefenseDuration;
        const avgLossDefenseDuration = avgOrFallback(
          lossDefenseDuration,
          lossesDefense
        );
        const winRatio = avgOrFallback(wins, games);
        const winRatioAttack = avgOrFallback(winsAttack, gamesAttack);
        const winRatioDefense = avgOrFallback(winsDefense, gamesDefense);
        const avgOwnGoals = avgOrFallback(ownGoals, games);

        const currentAvgTimeBetweenGoals = isAttack
          ? avgTimeBetween(duration, currentPlayers[id].goalTimings)
          : null;
        const totalAvgTimeBetweenGoals = isAttack
          ? playerMap[id].totalAvgTimeBetweenGoals + currentAvgTimeBetweenGoals
          : playerMap[id].totalAvgTimeBetweenGoals;

        const avgTimeBetweenGoals = avgOrFallback(
          totalAvgTimeBetweenGoals,
          gamesAttack
        );

        const currentAvgTimeBetweenGoalsAgainst = !isAttack
          ? avgTimeBetween(duration, currentPlayers[id].goalAgainstTimings)
          : null;
        const totalAvgTimeBetweenGoalsAgainst = !isAttack
          ? playerMap[id].totalAvgTimeBetweenGoalsAgainst
              + currentAvgTimeBetweenGoalsAgainst
          : playerMap[id].totalAvgTimeBetweenGoalsAgainst;
        const avgTimeBetweenGoalsAgainst = avgOrFallback(
          totalAvgTimeBetweenGoalsAgainst,
          gamesDefense
        );

        const placemnentFinished = games >= 10;

        let enemy1Id;
        let enemy2Id;

        if (isWinner) {
          enemy1Id = loserAttackId;
          enemy2Id = loserDefenseId;
        } else {
          enemy1Id = winnerAttackId;
          enemy2Id = winnerDefenseId;
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
        currentPlayers[id].isWinner = isWinner;
        currentPlayers[id].position = position;
        currentPlayers[id].winStreak = winStreak;
        currentPlayers[id].wins = wins;
        currentPlayers[id].losses = losses;
        currentPlayers[id].games = games;
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
        playerMap[id].games = games;
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

      _games.push(
        new Game({
          id: _id,
          startdate: new Date(startdate),
          duration,
          timeline,
          winnerScore: winnerAttackScore
            + winnerDefenseScore
            + loserAttackOwnGoals
            + loserDefenseOwnGoals,
          loserScore: loserAttackScore
            + loserDefenseScore
            + winnerAttackOwnGoals
            + winnerDefenseOwnGoals,
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

  _players.forEach(_player => {
    const checkedProps = [
      'avgGoalsPosStriker',
      'avgGoalsPosMidfield',
      'avgGoalsPosDefense',
      'avgGoalsPosKeeper',
      'avgTimeBetweenGoals',
      'avgTimeBetweenGoalsAgainst'
    ];

    if (_player.id === 'guest' || !_player.placemnentFinished) {
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

  for (let i = 0, len = _players.length; i < len; i++) {
    _players[i].selectionIndex = i;
  }

  return {
    players: _players,
    games: _games,
    teams: teams,
    properties
  };
};

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
  loserTeam.elo  = loserTeam.elo + loserTeamEloGain;
  winnerTeam.games++;
  winnerTeam.wins++;
  winnerTeam.winRatio = avgOrFallback(winnerTeam.wins, winnerTeam.games);
  loserTeam.games++;
  loserTeam.losses++;
  loserTeam.winRatio = avgOrFallback(loserTeam.wins, loserTeam.games);

  return [winnerTeam, loserTeam];
}
