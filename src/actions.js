import { load, post } from './api';

export const UPDATE_GAMES = 'UPDATE_GAMES';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
export const UPDATE_CURRENT_GAME = 'UPDATE_CURRENT_GAME';

export const updateGames = games => ({type: UPDATE_GAMES, games});
export const updatePlayers = players => ({type: UPDATE_PLAYERS, players});
export const updateCurrentGame = game => ({type: UPDATE_CURRENT_GAME, game})

export const getGames = () => (dispatch, getState) => {
  const url = '/data/games';
  load(url).then(
    data => {
      console.log(data);
      dispatch(updateGames(data));
    },
    error => {
      console.log('Error')
    }
  );
};

export const getPlayers = () => (dispatch, getState) => {
  const url = '/data/players';
  load(url).then(
    data => {
      console.log(data);
      dispatch(updatePlayers(data));
    },
    error => {
      console.log('Error')
    }
  );
};

export const saveGame = game => (dispatch, getState) => {
  const url = '/data/savegame';
  post(url, game).then(
    data => {
      console.log(data);
      dispatch(updateGames(data));
    },
    error => {
      console.log('Error')
    }
  );
}
