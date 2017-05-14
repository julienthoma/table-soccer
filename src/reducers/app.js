import * as actions from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_DATA:
      return {
        ...state,
        games: action.data.games,
        players: action.data.players,
        initialized: true
      };

    default:
      return state;
  }
};
