import { load, post } from './api';
import { calcPlayerElos } from './services/elo';

export const UPDATE_DATA = 'UPDATE_DATA';
export const START_GAME = 'START_GAME';
export const CANCEL_GAME = 'CANCEL_GAME';
export const END_GAME = 'END_GAME';
export const ADD_GOAL = 'ADD_GOAL';
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const ADD_GAME = 'ADD_GAME';
export const REVERSE_ORDER = 'REVERSE_ORDER';
export const UNDO_LAST_GOAL = 'UNDO_LAST_GOAL';
export const SET_ELO = 'SET_ELO';

export const updateData = data => ({type: UPDATE_DATA, data});
export const setElo = elos => ({type: SET_ELO, elos});
export const startGame = () => ({type: START_GAME});
export const cancelGame = () => ({type: CANCEL_GAME});
export const endGame = () => ({type: END_GAME});
export const reverseOrder = () => ({type: REVERSE_ORDER})

export const addGoal = (playerId, position) => ({type: ADD_GOAL, playerId, position});
export const undoLastGoal = () => ({type: UNDO_LAST_GOAL});
export const addGame = game => ({type: ADD_GAME, game});

export const selectPlayer = (player, position) => ({
  type: SELECT_PLAYER,
  player,
  position
});

export const getData = () => (dispatch, getState) => {
  const url = '/data';
  load(url).then(
    data => {
      console.log(data);
      dispatch(updateData(data));
      dispatch(setElo(calcPlayerElos()));
    },
    error => {
      console.log('Error')
    }
  );
};

export const saveGame = game => (dispatch, getState) => {
  const url = '/data/savegame';
  dispatch(addGame(game));

  post(url, game).then(
    data => {
      console.log('save successful');
      console.log(data);
    },
    error => {
      console.log('Error')
    }
  );
}
