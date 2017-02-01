import { load } from './api';

export const UPDATE_GAMES = 'UPDATE_GAMES';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';

export const updateGames = games => ({type: UPDATE_GAMES, games});
export const updatePlayers = players => ({type: UPDATE_PLAYERS, players});

export const getGames = () => (dispatch, getState) => {
  const url = '/games';
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
  const url = '/players';
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