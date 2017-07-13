import { initializeApp, database, auth } from 'firebase';
import { get } from '../services/Ajax';
import { transform } from '../services/transformer';
import { emailToSlug } from '../services/formatter';

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

export const prefetchDone = () => ({ type: PREFETCH_DONE });
export const setUser = user => ({ type: SET_USER, user });
export const updateData = data => ({ type: UPDATE_DATA, data });
export const startGame = () => ({ type: START_GAME });
export const endGame = game => ({ type: END_GAME, game });
export const exitGame = () => ({ type: EXIT_GAME });
export const addGoal = (index, position) => ({
  type: ADD_GOAL,
  index,
  position
});

export const addOwnGoal = index => ({
  type: ADD_OWN_GOAL,
  index
});

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

export const initializeFirebase = () => (dispatch, getState) => {
  initializeApp(getState().config.firebaseConfig);

  auth().onAuthStateChanged(firebaseUser => {
    console.log(firebaseUser);
    if (firebaseUser) {
      const { uid, photoURL, email, displayName } = firebaseUser;
      const slug = emailToSlug(email);
      const userRef = database()
        .ref(`data/players/${slug}`);

      userRef
        .once('value')
        .then(snapshot => {
          if (!snapshot.val()) {
            userRef.set({
              id: slug,
              uid,
              photoURL,
              email,
              name: displayName,
              verified: false
            }).then(() => {
              dispatch(setUser(snapshot.val()));
            });
          } else {
            userRef.update({
              photoURL,
              name: displayName
            }).then(() => {
              dispatch(setUser(snapshot.val()));
            });
          }
        });
    }
  });
};

export const getData = () => (dispatch, getState) => {
  const url = 'https://react-tablesoccer-v.firebaseio.com/data.json';
  // Make initial call as ajax for faster startup (socket startup is slow)
  get(url).then(data => {
    dispatch(updateData(transform(data)));

    database().ref('data').on('value', snapshot => {
      // Done update twice after intial call.
      if (getState().app.prefetchDone) {
        dispatch(updateData(transform(snapshot.val())));
      } else {
        dispatch(prefetchDone());
      }
    });
  });
};

export const uploadGame = game => dispatch => {
  dispatch(endGame(game));
  database().ref(`data/games/${game[0]}`).set(game);
};
