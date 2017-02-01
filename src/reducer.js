import { UPDATE_GAMES, UPDATE_PLAYERS } from './actions';

export default (state = getInitState(), action) => {
  switch(action.type) {
    case UPDATE_GAMES:
      return Object.assign({}, state, {
        games: action.games
      });

    case UPDATE_PLAYERS:
      return Object.assign({}, state, {
        players: action.players
      });

    default:
      return state;
  }
};

const getInitState = () => ({
  games: [],
  players: []
});
