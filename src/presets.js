import { TEAM1_FRONT_PLAYER, TEAM1_REAR_PLAYER, TEAM2_FRONT_PLAYER, TEAM2_REAR_PLAYER } from './constants';

export const CURRENT_GAME = {
  [TEAM1_FRONT_PLAYER]: 0,
  [TEAM1_REAR_PLAYER]: 1,
  [TEAM2_FRONT_PLAYER]: 2,
  [TEAM2_REAR_PLAYER]: 3,
  hasStarted: false,
  startdate: null,
  enddate: null,
  winners: [],
  losers: [],
  isFinished: false,
  scoreTimeline: [],
  stepperIndex: 0
};
