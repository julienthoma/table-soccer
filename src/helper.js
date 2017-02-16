import { TEAM1_FRONT_PLAYER, TEAM1_REAR_PLAYER, TEAM2_FRONT_PLAYER, TEAM2_REAR_PLAYER, REAR_PLAYER, FRONT_PLAYER} from './constants';
let getState;

export const setGetState = (_getState) => {
  getState = _getState;
}

// Players
export const getPlayerByName = name => getState().players.filter(p => p.name === name)[0];

export const getWinnerLoserPlayersByGame = game => {
  return [
    game.winners.filter(player => player.position === REAR_PLAYER)[0],
    game.winners.filter(player => player.position === FRONT_PLAYER)[0],
    game.losers.filter(player => player.position === FRONT_PLAYER)[0],
    game.losers.filter(player => player.position === REAR_PLAYER)[0]
  ];
}

export const getScoreByGame = game => [
  game.winners[0].score + game.winners[1].score,
  game.losers[0].score + game.losers[1].score
];

export const getTempScoreByGame = (game, index) => {
  const subTimeline = game.scoreTimeline.slice(0, index + 1);

  return subTimeline.reduce((score, scorer) => {
    if (scorer.position === TEAM1_FRONT_PLAYER || scorer.position === TEAM1_REAR_PLAYER) {
      score[0]++;
    } else {
      score[1]++;
    }

    return score;
  }, [0, 0]);
}

// newGame
export const getPlayerByPosition = position => {
  return getPlayerByName(getState().newGame[position]);
}

export const getPlayerById = id => getState().players.filter(p => p.id === id)[0];


export const getCurrentScore = () => getScoreByGame(getState().newGame);

// Timeline
export const getScoreByPosition = pos => getState().newGame.scoreTimeline.filter(e => e.position === pos).length;

export const applyFnForPositions = (fn) => [
  fn(TEAM1_REAR_PLAYER),
  fn(TEAM1_FRONT_PLAYER),
  fn(TEAM2_FRONT_PLAYER),
  fn(TEAM2_REAR_PLAYER),
];

export const isTeam1Goal = goalScorer => {
  return goalScorer.position === TEAM1_FRONT_PLAYER || goalScorer.position === TEAM1_REAR_PLAYER;
}

export const isOffensive = goalScorer => {
  return goalScorer.position === TEAM1_FRONT_PLAYER || goalScorer.position === TEAM2_FRONT_PLAYER;
}

