import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {
  startNewGame, 
  exitGame,
  setPlayers,
  getPlayersFromSlack
} from '../actions';
import GameScoreScreen from '../containers/GameScoreScreen';
import PlayerSelection from '../containers/PlayerSelection';
import { login } from '../services/auth';
import * as consts from '../constants';
import { gamePlayerShape, currentUserShape } from '../proptypes';

class GameCreator extends React.Component {
  isValidPlayerCombo = () => {
    const set = new Set(
      this.props.players
        .map(player => player.index)
        .filter(index => index !== -1)
    );
    return set.size === 4;
  };

  rematchRotate = () => {
    const players = this.props.players.slice(0);
    players.unshift(players.pop());
    this.props.dispatch(setPlayers(players));
    this.props.dispatch(exitGame());
  };

  rematchSwap = () => {
    const [p1, p2, p3, p4] = this.props.players.slice(0);
    const newPlayers = [p3, p1, p4, p2];
    this.props.dispatch(setPlayers(newPlayers));
    this.props.dispatch(exitGame());
  };

  startNewGame = () => this.props.dispatch(startNewGame());

  exitGame = () => {
    this.props.dispatch(exitGame());
    this.props.history.push('/');
  };

  renderSelectPlayers = () => (
    <div>
      <PlayerSelection />
      <RaisedButton label="Exit" onClick={this.exitGame} />

      <RaisedButton
        label="Slackbot"
        onClick={() => this.props.dispatch(getPlayersFromSlack())}
        style={{ marginLeft: 10 }}
      />

      <RaisedButton
        label="Start Game"
        primary
        disabled={!this.isValidPlayerCombo()}
        onClick={this.startNewGame}
        style={{ marginLeft: 10 }}
      />
    </div>
  );

  renderActiveGame = () => (
    <div>
      <GameScoreScreen />
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
  };

  render() {
    const { activeStep, currentGoogleUser, allPlayers } = this.props;

    if (!currentGoogleUser) {
      return (
        <div>
          <p>You need to sign in to create games</p>
          <RaisedButton label="Google sign-in" onClick={login} />
        </div>
      );
    }

    const user = allPlayers.filter(p => p.id === currentGoogleUser.id)[0];

    if (!currentGoogleUser.verified && user.games < 10) {
      return (
        <div>
          <p>
            You need 10 games to create games yourself or ask the admin for
            permission
          </p>
          <Link to="/">Back Home</Link>
        </div>
      );
    }

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

    return <div style={{ padding: 8 }}>{content}</div>;
  }
}

GameCreator.defaultProps = {
  activeStep: consts.SELECT_PLAYERS_STEP,
  players: [],
  currentGoogleUser: null
};

GameCreator.propTypes = {
  activeStep: PropTypes.oneOf([
    consts.SELECT_PLAYERS_STEP,
    consts.ACTIVE_GAME_STEP,
    consts.GAME_END_STEP
  ]),
  players: PropTypes.arrayOf(gamePlayerShape).isRequired,
  dispatch: PropTypes.func.isRequired,
  currentGoogleUser: currentUserShape
};

const mapStateToProps = ({ game, user, app }) => ({
  players: game.players,
  allPlayers: app.players,
  activeStep: game.activeStep,
  currentGoogleUser: user.currentUser
});

export default connect(mapStateToProps)(GameCreator);
