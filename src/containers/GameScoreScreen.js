import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { TEAM1_FRONT_PLAYER, TEAM1_REAR_PLAYER, TEAM2_FRONT_PLAYER, TEAM2_REAR_PLAYER, FRONT_PLAYER, REAR_PLAYER } from '../constants';
import RaisedButton from 'material-ui/RaisedButton';
import { addGoal, saveGame, endGame } from '../actions';
import { getScoreByPosition, getPlayerByName, applyFnForPositions } from '../helper';

class GameScoreScreen extends Component {
  componentDidUpdate = () => {
    const { dispatch, game } = this.props;

    if (!this.isGameFinished() || game.isFinished) {
      return;
    }

    let winners;
    let losers;

    if (getScoreByPosition(TEAM1_FRONT_PLAYER) + getScoreByPosition(TEAM1_REAR_PLAYER) >= 6) {
      winners = [this.createPlayer(TEAM1_FRONT_PLAYER), this.createPlayer(TEAM1_REAR_PLAYER)];
      losers = [this.createPlayer(TEAM2_FRONT_PLAYER), this.createPlayer(TEAM2_REAR_PLAYER)];
    } else {
      winners = [this.createPlayer(TEAM2_FRONT_PLAYER), this.createPlayer(TEAM2_REAR_PLAYER)];
      losers = [this.createPlayer(TEAM1_FRONT_PLAYER), this.createPlayer(TEAM1_REAR_PLAYER)];
    }

    dispatch(endGame());
    dispatch(saveGame({
      startdate: game.startdate,
      enddate: new Date(),
      scoreTimeline: game.scoreTimeline,
      winners,
      losers
    }));
  };

  render() {
    const { game } = this.props;
    const [t1RearScore, t1FrontScore, t2FrontScore, t2RearScore] = applyFnForPositions(getScoreByPosition);
    const buttonStyle = {height: 80, width: '100%'};

    return (
      <div style={{display: 'flex', flexDirection: 'column', marginBottom: 10, padding: 5}}>
        <div className="score" style={{display: 'flex', padding: 5, justifyContent: 'center'}}>
          <h1 style={{}}>{t1FrontScore + t1RearScore}</h1>
          <h1>:</h1>
          <h1 style={{}}>{t2RearScore + t2FrontScore}</h1>
        </div>
        <RaisedButton
          disabled={this.props.game.isFinished}
          primary={true}
          onClick={this.handleScoreButtonClick(TEAM1_FRONT_PLAYER)}
          buttonStyle={buttonStyle}
          style={{marginBottom: 15}}
          label={game[TEAM1_FRONT_PLAYER]}
        />
        <RaisedButton
          disabled={this.props.game.isFinished}
          primary={true}
          onClick={this.handleScoreButtonClick(TEAM1_REAR_PLAYER)}
          buttonStyle={buttonStyle}
          style={{marginBottom: 15}}
          label={game[TEAM1_REAR_PLAYER]}
        />
        <RaisedButton
          disabled={this.props.game.isFinished}
          secondary={true}
          onClick={this.handleScoreButtonClick(TEAM2_FRONT_PLAYER)}
          buttonStyle={buttonStyle}
          style={{marginBottom: 15}}
          label={game[TEAM2_FRONT_PLAYER]}
        />
        <RaisedButton
          disabled={this.props.game.isFinished}
          secondary={true}
          onClick={this.handleScoreButtonClick(TEAM2_REAR_PLAYER)}
          buttonStyle={buttonStyle}
          style={{marginBottom: 15}}
          label={game[TEAM2_REAR_PLAYER]}
        />
      </div>
    );
  }

  handleScoreButtonClick = position => () => {
    const { dispatch, game } = this.props;
    const player = getPlayerByName(game[position]);

    dispatch(addGoal(player.id, position));
  };

  isGameFinished = () => {
    const [t1RearScore, t1FrontScore, t2FrontScore, t2RearScore] = applyFnForPositions(getScoreByPosition);
    return (t1RearScore + t1FrontScore) >= 6 || (t2FrontScore + t2RearScore) >= 6;
  };

  createPlayer = position => {
    const generalPosition =
      (position === TEAM1_FRONT_PLAYER || position === TEAM2_FRONT_PLAYER) ? FRONT_PLAYER : REAR_PLAYER;
    const { game } = this.props;
    const score = getScoreByPosition(position);
    const name = game[position];
    const player = getPlayerByName(name);

    return {score, id: player.id, position: generalPosition};
  };
}

const mapStateToProps = state => ({
  players: state.players,
  game: state.newGame
});

const _GameScoreScreen = connect(mapStateToProps)(GameScoreScreen);

export default _GameScoreScreen;
