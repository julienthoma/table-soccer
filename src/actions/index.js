import { get, post } from '../services/Ajax';
import { transform } from '../services/transformer';

export const UPDATE_DATA = 'UPDATE_DATA';
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const EXIT_GAME = 'EXIT_GAME';
export const ADD_GOAL = 'ADD_GOAL';
export const UNDO_LAST_GOAL = 'UNDO_LAST_GOAL';
export const SET_PLAYERS = 'SET_PLAYERS';
export const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR';

export const updateData = data => ({ type: UPDATE_DATA, data });
export const startGame = () => ({ type: START_GAME });
export const endGame = game => ({ type: END_GAME, game });
export const exitGame = () => ({ type: EXIT_GAME });

export const addGoal = index => ({ type: ADD_GOAL, index });
export const undoLastGoal = index => ({ type: UNDO_LAST_GOAL, index });
export const toggleSnackbar = (infoText, actionText, callbackFn) => ({
  type: TOGGLE_SNACKBAR,
  infoText,
  actionText,
  callbackFn
});

export const setPlayers = players => ({
  type: SET_PLAYERS,
  players
});

export const getData = () => dispatch => {
  const url = '/data';
  get(url).then(
    data => {
      const transformedData = transform(data);
      dispatch(updateData(transformedData));
    }
  );
};

export const uploadGame = game => dispatch => {
  const url = '/data/addgames';
  dispatch(endGame(game));

  post(url, [game]).then(
    (data) => {
      const transformedData = transform(data);
      dispatch(updateData(transformedData));
      dispatch(toggleSnackbar('Game added successfully', 'Ok, I got it!'));
    }
  );
};
