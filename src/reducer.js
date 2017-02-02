import { UPDATE_GAMES, UPDATE_PLAYERS, UPDATE_CURRENT_GAME } from './actions';
import { CURRENT_GAME } from './presets';

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

    case UPDATE_CURRENT_GAME:
      return Object.assign({}, state, {
        currentGame: action.game
      });

    default:
      return state;
  }
};

const getInitState = () => ({
  games: [],
  players: [],
  currentGame: CURRENT_GAME
});
