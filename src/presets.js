import { SELECT_PLAYERS_STEP } from './containers/GameCreator';

export const NEW_GAME = {
  startdate: null,
  enddate: null,
  winners: [],
  losers: [],
  scoreTimeline: [],
  activeStep: SELECT_PLAYERS_STEP,
  snackBarOpen: false
};
