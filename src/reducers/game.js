import * as actions from '../actions';
import * as consts from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.START_GAME:
      return {
        ...state,
        startdate: new Date().getTime(),
        activeStep: consts.ACTIVE_GAME_STEP,
        scoreTimeline: [],
        isFinished: false,
        score: [0, 0, 0, 0, 0, 0, 0, 0]
      };

    case actions.END_GAME:
      return {
        ...state,
        activeStep: consts.GAME_END_STEP,
        lastGame: action.game,
        isFinished: true
      };

    case actions.EXIT_GAME:
      return {
        ...state,
        activeStep: consts.SELECT_PLAYERS_STEP
      };

    case actions.ADD_GOAL:
      const score = state.score.slice(0);
      score[action.index]++;

      return {
        ...state,
        scoreTimeline: [
          ...state.scoreTimeline,
          {
            id: state.players[action.index].id,
            index: action.index,
            position: action.position,
            time: parseInt((new Date().getTime() - state.startdate) / 1000, 10)
          }
        ],
        score
      };

    case actions.ADD_OWN_GOAL:
      const _score = state.score.slice(0);
      _score[action.index + 4]++;

      return {
        ...state,
        scoreTimeline: [
          ...state.scoreTimeline,
          {
            id: state.players[action.index].id,
            index: action.index,
            time: parseInt((new Date().getTime() - state.startdate) / 1000, 10),
            ownGoal: true
          }
        ],
        score: _score
      };

    case actions.UNDO_LAST_GOAL:
      const newScore = state.score.slice(0);
      const timeline = state.scoreTimeline.slice(0);
      const lastItem = timeline.pop();
      const index = lastItem.ownGoal ? action.index + 4 : action.index;

      newScore[index]--;

      return {
        ...state,
        scoreTimeline: timeline,
        score: newScore
      };

    case actions.SET_PLAYERS:
      return {
        ...state,
        players: action.players
      };

    default:
      return state;
  }
};
