import { SELECT_PLAYERS_STEP } from './containers/GameCreator';

export const NEW_GAME = {
  startdate: null,
  enddate: null,
  winners: [],
  losers: [],
  isFinished: false,
  scoreTimeline: [],
  activeStep: SELECT_PLAYERS_STEP,
  orderReversed: false
};
