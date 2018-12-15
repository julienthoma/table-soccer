import * as actions from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_DATA:
      return {
        ...state,
        games: action.data.games,
        players: action.data.players,
        teams: action.data.teams,
        properties: action.data.properties,
        initialized: true
      };

    case actions.PREFETCH_DONE:
      return {
        ...state,
        prefetchDone: true
      };

    default:
      return state;
  }
};
