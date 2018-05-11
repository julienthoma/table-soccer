import { initializeApp, database, auth } from 'firebase';
import { get, post } from '../services/ajax';
import * as customAuth from '../services/auth';

import { transform } from '../services/transformer';
import { emailToSlug } from '../services/formatter';
import { getScore } from '../services/helper';
import { GOAL_TIMEOUT } from '../constants/';
import { createEndMessage } from '../services/Slack';

export const UPDATE_DATA = 'UPDATE_DATA';
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const EXIT_GAME = 'EXIT_GAME';
export const ADD_GOAL = 'ADD_GOAL';
export const ADD_OWN_GOAL = 'ADD_OWN_GOAL';
export const UNDO_LAST_GOAL = 'UNDO_LAST_GOAL';
export const SET_PLAYERS = 'SET_PLAYERS';
export const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR';
export const SET_USER = 'SET_USER';
export const PREFETCH_DONE = 'PREFETCH_DONE';
export const LOGIN = 'LOGIN';

export const prefetchDone = () => ({ type: PREFETCH_DONE });
export const setUser = user => ({ type: SET_USER, user });
export const updateData = data => ({ type: UPDATE_DATA, data });
export const startGame = () => ({ type: START_GAME });
export const endGame = game => ({ type: END_GAME, game });
export const exitGame = () => ({ type: EXIT_GAME });
export const undoLastGoal = index => ({ type: UNDO_LAST_GOAL, index });
export const addOwnGoal = index => ({ type: ADD_OWN_GOAL, index });
export const setPlayers = players => ({ type: SET_PLAYERS, players });

export const addGoal = (index, position) => ({
  type: ADD_GOAL,
  index,
  position
});

export const startNewGame = () => dispatch => {
  dispatch(startGame());
};

export const toggleSnackbar = (infoText, actionText, callbackFn) => ({
  type: TOGGLE_SNACKBAR,
  infoText,
  actionText,
  callbackFn
});

export const login = () => ({ type: LOGIN });

export const startLogin = () => dispatch => {
  dispatch(login());
  customAuth.login();
};

export const initializeFirebase = () => (dispatch, getState) => {
  dispatch(login());
  initializeApp(getState().config.firebaseConfig);
  auth().onAuthStateChanged(firebaseUser => {
    if (!firebaseUser) {
      return dispatch(setUser(null));
    }

    const { uid, photoURL, email, displayName } = firebaseUser;
    const id = emailToSlug(email);
    const userRef = database().ref(`data/players/${id}`);

    userRef.once('value').then(snapshot => {
      if (!snapshot.val()) {
        userRef
          .set({ id, uid, photoURL, email, name: displayName, verified: false })
          .then(() => dispatch(setUser(snapshot.val())));
      } else {
        userRef
          .update({ photoURL, name: displayName })
          .then(() => dispatch(setUser(snapshot.val())));
      }
    });
  });
};

export const getData = () => (dispatch, getState) => {
  // Make initial call as ajax for faster startup (socket startup is slow)
  get(getState().config.dbUrl).then(data => {
    dispatch(updateData(transform(data)));
    database()
      .ref('data')
      .on('value', snapshot => {
        // Don't update twice after intial call.
        if (getState().app.prefetchDone) {
          dispatch(updateData(transform(snapshot.val())));
        } else {
          dispatch(prefetchDone());
        }
      });
  });
};

export const uploadGame = game => (dispatch, getState) => {
  const [team1Score, team2Score] = getScore(getState().game.score);
  const _game = getState().game.players;
  const players = getState().app.players;
  const gameId = game[0];
  const team1Attack = players.filter(p => p.id === _game[0].id)[0];
  const team1Defense = players.filter(p => p.id === _game[1].id)[0];
  const team2Attack = players.filter(p => p.id === _game[2].id)[0];
  const team2Defense = players.filter(p => p.id === _game[3].id)[0];
  setTimeout(() => {
    post(
      getState().config.slackUrl,
      createEndMessage(
        gameId,
        team1Score,
        team2Score,
        team1Attack,
        team1Defense,
        team2Attack,
        team2Defense
      )
    );
  }, GOAL_TIMEOUT * 1.5);
  dispatch(endGame(game));
  database()
    .ref(`data/games/${gameId}`)
    .set(game);
};

export const getPlayersFromSlack = () => (dispatch, getState) => {
  // Make initial call as ajax for faster startup (socket startup is slow)
  get('getState().config.slackBotUrl').then(data => {
    dispatch(
      setPlayers(
        data.map(email => {
          const player =
            getState().app.players.filter(p => p.email === email)[0] ||
            getState().app.players.filter(p => p.id === 'guest')[0];

          return {
            name: player.name,
            id: player.id,
            index: player.selectionIndex
          };
        })
      )
    );
  });
};
