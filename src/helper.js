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

// newGame
export const getPlayerByPosition = position => {
  return getPlayerByName(getState().newGame[position]);
}

export const getCurrentScore = () => getScoreByGame(getState().newGame);

// Timeline
export const getScoreByPosition = pos => getState().newGame.scoreTimeline.filter(e => e.position === pos).length;

export const applyFnForPositions = (fn) => [
  fn(TEAM1_REAR_PLAYER),
  fn(TEAM1_FRONT_PLAYER),
  fn(TEAM2_FRONT_PLAYER),
  fn(TEAM2_REAR_PLAYER),
];