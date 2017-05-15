import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { startGame, exitGame, setPlayers } from '../actions';
import GameScoreScreen from '../containers/GameScoreScreen';
import PlayerSelection from '../containers/PlayerSelection';
import * as consts from '../constants';

class GameCreator extends React.Component {
  render() {
    const { activeStep } = this.props;
    let content;
    switch (activeStep) {
      case consts.SELECT_PLAYERS_STEP:
        content = this.renderSelectPlayers();
        break;
      case consts.ACTIVE_GAME_STEP:
        content = this.renderActiveGame();
        break;
      case consts.GAME_END_STEP:
        content = this.renderGameEnd();
        break;

      default:
        return false;
    }

    return <div>{ content }</div>;
  }

  renderSelectPlayers = () => (
    <div>
      <PlayerSelection />
      <RaisedButton
        label="Exit"
        onClick={this.exitGame}
      />

      <RaisedButton
        label="Start Game"
        primary
        disabled={!this.isValidPlayerCombo()}
        onClick={this.startNewGame}
        style={{ marginLeft: 12 }}
      />
    </div>
  );

  renderActiveGame = () => (
    <div>
      <GameScoreScreen />
      <RaisedButton
        label="Cancel"
        onClick={() => this.props.dispatch(exitGame())}
      />
    </div>
  );

  renderGameEnd = () => {
    const buttonStyle = { height: 120 };
    const labelStyle = { fontSize: 20 };
    const outerStyle = { width: '100%', marginBottom: 10 };

    return (
      <div>
        <RaisedButton
          secondary
          onClick={this.exitGame}
          buttonStyle={buttonStyle}
          style={outerStyle}
          labelStyle={labelStyle}
          label="Back Home"
        />

        <RaisedButton
          primary
          onClick={this.rematchRotate}
          buttonStyle={buttonStyle}
          style={outerStyle}
          labelStyle={labelStyle}
          label="Rotate and Rematch!"
        />

        <RaisedButton
          primary
          onClick={this.rematchSwap}
          buttonStyle={buttonStyle}
          style={outerStyle}
          labelStyle={labelStyle}
          label="Cross Swap and Rematch!"
        />

      </div>
    );
  }

  rematchRotate = () => {
    const players = this.props.players.slice(0);
    players.unshift(players.pop());
    this.props.dispatch(setPlayers(players));
    this.props.dispatch(exitGame());
  }

  rematchSwap = () => {
    const [p1, p2, p3, p4] = this.props.players.slice(0);
    const newPlayers = [p3, p1, p4, p2];
    this.props.dispatch(setPlayers(newPlayers));
    this.props.dispatch(exitGame());
  }

  startNewGame = () => this.props.dispatch(startGame())

  exitGame = () => {
    this.props.dispatch(exitGame());
    browserHistory.push('/');
  }

  isValidPlayerCombo = () => {
    const set = new Set(this.props.players.map(player => player.index).filter(index => index !== -1));
    return set.size === 4;
  }
}

GameCreator.defaultProps = {
  activeStep: consts.SELECT_PLAYERS_STEP,
  players: []
};

GameCreator.propTypes = {
  activeStep: React.PropTypes.oneOf([
    consts.SELECT_PLAYERS_STEP,
    consts.ACTIVE_GAME_STEP,
    consts.GAME_END_STEP
  ])
};

const mapStateToProps = state => ({
  players: state.game.players,
  activeStep: state.game.activeStep
});

const _GameCreator = connect(mapStateToProps)(GameCreator);

export default _GameCreator;