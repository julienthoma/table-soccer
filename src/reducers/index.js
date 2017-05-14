import { combineReducers } from 'redux';
import app from './app';
import game from './game';
import snackbar from './snackbar';

export default combineReducers({ app, game, snackbar });
