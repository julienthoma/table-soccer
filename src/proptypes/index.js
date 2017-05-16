import React from 'react';

export const simplePlayerShape = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  score: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6])
};

export const playerBase = {
  ...simplePlayerShape,
  wins: React.PropTypes.number,
  losses: React.PropTypes.number,
  games: React.PropTypes.number,
  goals: React.PropTypes.number,
  elo: React.PropTypes.number,
  winStreak: React.PropTypes.number
};

export const gamePlayer = {
  ...playerBase,
  isWinner: React.PropTypes.bool,
  position: React.PropTypes.oneOf(['attack', 'defense']),
  eloGain: React.PropTypes.number
};

export const playerShape = {
  ...playerBase,
  winsAttack: React.PropTypes.number,
  winsDefense: React.PropTypes.number,
  lossesAttack: React.PropTypes.number,
  lossesDefense: React.PropTypes.number,
  gamesAttack: React.PropTypes.number,
  gamesDefense: React.PropTypes.number,
  goalsAttack: React.PropTypes.number,
  goalsDefense: React.PropTypes.number,
  gpg: React.PropTypes.number,
  playTime: React.PropTypes.number,
  playTimeAttack: React.PropTypes.number,
  playTimeDefense: React.PropTypes.number
};

export const gameShape = {
  id: React.PropTypes.string,
  startdate: React.PropTypes.instanceOf(Date),
  duration: React.PropTypes.number,
  winnerScore: React.PropTypes.number,
  loserScore: React.PropTypes.number,
  winnerAttack: React.PropTypes.shape(simplePlayerShape),
  winnerDefense: React.PropTypes.shape(simplePlayerShape),
  loserAttack: React.PropTypes.shape(simplePlayerShape),
  loserDefense: React.PropTypes.shape(simplePlayerShape),
  players: React.PropTypes.objectOf(React.PropTypes.shape(gamePlayer))
};

