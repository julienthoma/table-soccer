import React, { Component } from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import { startGame, cancelGame, reverseOrder } from '../actions';
import GameScoreScreen from './GameScoreScreen';
import PlayerSelection from './PlayerSelection';
import IconButton from 'material-ui/IconButton';
import ActionCached from 'material-ui/svg-icons/action/cached';
import { browserHistory } from 'react-router'
import { TEAM1_FRONT_PLAYER, TEAM1_REAR_PLAYER, TEAM2_FRONT_PLAYER, TEAM2_REAR_PLAYER } from '../constants';

export const SELECT_PLAYERS_STEP = 'SELECT_PLAYERS_STEP';
export const ACTIVE_GAME_STEP = 'ACTIVE_GAME_STEP';
export const GAME_END_STEP = 'GAME_END_STEP';

class GameCreator extends Component {
  render() {
    const { activeStep } = this.props;
    let content;
    switch (activeStep) {
      case SELECT_PLAYERS_STEP:
        content = this.renderSelectPlayers();
        break;
      case ACTIVE_GAME_STEP:
        content = this.renderActiveGame();
        break;
      case GAME_END_STEP:
    }

    return <div>{ content }</div>;
  };

  handleRotateClick = () => {
    this.props.dispatch(reverseOrder());
  }

  renderSelectPlayers = () => (
    <div>
      <IconButton
        onClick={this.handleRotateClick}
      >
        <ActionCached />
      </IconButton>
      <PlayerSelection />
      <RaisedButton
        label="Cancel"
        onClick={this.cancelActiveGame}
      />

      <RaisedButton
        label="Start Game"
        primary={true}
        disabled={!this.isValidPlayerCombo()}
        onClick={this.startNewGame}
        style={{marginLeft: 12}}
      />
    </div>
  );

  renderActiveGame = () => (
    <div>
      <GameScoreScreen />
      <RaisedButton
        label="Cancel"
        onClick={this.cancelActiveGame}
      />
    </div>
  );

  renderGameEnd = () => {
    return (<div>hello</div>)
  }

  startNewGame = () => this.props.dispatch(startGame());
  cancelActiveGame = () => {
    this.props.dispatch(cancelGame());
    browserHistory.push('/');
  }

  isValidPlayerCombo = () => {
    const { game } = this.props;
    const set = new Set([
      game[TEAM1_FRONT_PLAYER],
      game[TEAM1_REAR_PLAYER],
      game[TEAM2_FRONT_PLAYER],
      game[TEAM2_REAR_PLAYER]
    ]);

    return set.size === 4;
  }
}

const mapStateToProps = state => ({
  players: state.players,
  game: state.newGame,
  activeStep: state.newGame.activeStep
});

const _GameCreator = connect(mapStateToProps)(GameCreator);

export default _GameCreator;
