import { combineReducers } from 'redux';
import app from './app';
import game from './game';
import snackbar from './snackbar';
import user from './user';
import config from './config';

export default combineReducers({ app, game, snackbar, user, config });
