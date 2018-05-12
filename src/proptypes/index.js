import {
  number,
  bool,
  string,
  shape,
  instanceOf,
  oneOf,
  objectOf
} from 'prop-types';

export const simplePlayerShape = shape({
  id: string,
  name: string,
  score: oneOf([0, 1, 2, 3, 4, 5, 6])
});

const playerBase = {
  id: string,
  name: string,
  wins: number,
  losses: number,
  games: number,
  goals: number,
  elo: number,
  winStreak: number
};

export const gamePlayerShape = shape({
  ...playerBase,
  score: oneOf([0, 1, 2, 3, 4, 5, 6]),
  isWinner: bool,
  position: oneOf(['attack', 'defense']),
  eloGain: number
});

export const playerShape = shape({
  ...playerBase,
  winsAttack: number,
  winsDefense: number,
  lossesAttack: number,
  lossesDefense: number,
  gamesAttack: number,
  gamesDefense: number,
  goalsAttack: number,
  goalsDefense: number,
  gpg: number,
  playTime: number,
  playTimeAttack: number,
  playTimeDefense: number
});

export const gameShape = shape({
  id: string,
  startdate: instanceOf(Date),
  duration: number,
  winnerScore: number,
  loserScore: number,
  winnerAttack: simplePlayerShape,
  winnerDefense: simplePlayerShape,
  loserAttack: simplePlayerShape,
  loserDefense: simplePlayerShape,
  players: objectOf(gamePlayerShape)
});

export const scoreTimelineItemShape = shape({
  id: string.isRequired,
  index: number.isRequired,
  time: number.isRequired
});

export const userShape = shape({
  name: string.isRequired,
  photoUrl: string
});

export const currentUserShape = shape({
  verified: bool.isRequired,
  id: string.isRequired
});
