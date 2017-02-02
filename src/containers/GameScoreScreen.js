import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader';
import { TEAM1_FRONT_PLAYER, TEAM1_REAR_PLAYER, TEAM2_FRONT_PLAYER, TEAM2_REAR_PLAYER, FRONT_PLAYER, REAR_PLAYER } from '../constants';
import RaisedButton from 'material-ui/RaisedButton';
import { updateCurrentGame } from '../actions';

class GameScoreScreen extends Component {

  getScoreByPosition = position => {
    return this.props.currentGame.scoreTimeline.filter(entry => entry.goalScorer === position).length;
  };

  isGameFinished = () => {
    const team1FrontPlayerScore = this.getScoreByPosition(TEAM1_FRONT_PLAYER);
    const team1RearPlayerScore = this.getScoreByPosition(TEAM1_REAR_PLAYER);
    const team2FrontPlayerScore = this.getScoreByPosition(TEAM2_FRONT_PLAYER);
    const team2RearPlayerScore = this.getScoreByPosition(TEAM2_REAR_PLAYER);

    return (team1FrontPlayerScore + team1RearPlayerScore) >= 6 || (team2FrontPlayerScore + team2RearPlayerScore) >= 6;
  };

  createPlayer = position => {
    const generalPosition =
      (position === TEAM1_FRONT_PLAYER || position === TEAM2_FRONT_PLAYER) ? FRONT_PLAYER : REAR_PLAYER;
    const { currentGame, players } = this.props;
    const score = this.getScoreByPosition(position);
    const name = players[currentGame[position]].name;
    const icon = players[currentGame[position]].icon

    return {score, name, position: generalPosition, icon};
  };

  componentDidUpdate = () => {
    const { dispatch, currentGame, players } = this.props;

    if (currentGame.isFinished) {
      return;
    }

    const isFinished = this.isGameFinished();

    if (isFinished) {
      const enddate = new Date();
      let winners;
      let losers;
      const team1FrontPlayerScore = this.getScoreByPosition(TEAM1_FRONT_PLAYER);
      const team1RearPlayerScore = this.getScoreByPosition(TEAM1_REAR_PLAYER);

      if (team1FrontPlayerScore + team1RearPlayerScore >= 6) {
        winners = [this.createPlayer(TEAM1_FRONT_PLAYER), this.createPlayer(TEAM1_REAR_PLAYER)];
        losers = [this.createPlayer(TEAM2_FRONT_PLAYER), this.createPlayer(TEAM2_REAR_PLAYER)];
      } else {
        winners = [this.createPlayer(TEAM2_FRONT_PLAYER), this.createPlayer(TEAM2_REAR_PLAYER)];
        losers = [this.createPlayer(TEAM1_FRONT_PLAYER), this.createPlayer(TEAM1_REAR_PLAYER)];
      }

      dispatch(updateCurrentGame(Object.assign({}, currentGame, {isFinished, enddate, winners, losers})))
    }
  };

  render() {
    const { currentGame, players } = this.props;
    const team1FrontPlayerScore = this.getScoreByPosition(TEAM1_FRONT_PLAYER);
    const team1RearPlayerScore = this.getScoreByPosition(TEAM1_REAR_PLAYER);
    const team2FrontPlayerScore = this.getScoreByPosition(TEAM2_FRONT_PLAYER);
    const team2RearPlayerScore = this.getScoreByPosition(TEAM2_REAR_PLAYER);
    const team1FrontPlayer = players[currentGame[TEAM1_FRONT_PLAYER]];
    const team1RearPlayer = players[currentGame[TEAM1_REAR_PLAYER]];
    const team2FrontPlayer = players[currentGame[TEAM2_FRONT_PLAYER]];
    const team2RearPlayer = players[currentGame[TEAM2_REAR_PLAYER]];
    const scoreHeadlineStyle = {padding: '0 10px', lineHeight: '50px', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontWeight: 400, fontSize: 36}

    return (
      <div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}} zDepth={2}>
        <Subheader>TEAM 1</Subheader>
        <div style={{padding: 0, display: 'flex', justifyContent: 'space-between'}}>
          { this.renderScoreButton(team1FrontPlayerScore, team1FrontPlayer, TEAM1_FRONT_PLAYER)}
          { this.renderScoreButton(team1RearPlayerScore, team1RearPlayer, TEAM1_REAR_PLAYER)}
        </div>

        <div style={{display: 'flex', padding: 5, justifyContent: 'center'}}>
          <h1 style={scoreHeadlineStyle}>{team1FrontPlayerScore + team1RearPlayerScore}</h1>
          <h1 style={scoreHeadlineStyle}>:</h1>
          <h1 style={scoreHeadlineStyle}>{team2FrontPlayerScore + team2RearPlayerScore}</h1>
        </div>

        <div style={{padding: 0, display: 'flex', justifyContent: 'space-between'}}>
          { this.renderScoreButton(team2FrontPlayerScore, team2FrontPlayer, TEAM2_FRONT_PLAYER)}
          { this.renderScoreButton(team2RearPlayerScore, team2RearPlayer, TEAM2_REAR_PLAYER)}
        </div>
        <Subheader>TEAM 2</Subheader>
      </div>
    );
  }

  handleScoreButtonClick = position => () => {
    const { dispatch, currentGame, players } = this.props;

    const player = players[currentGame[position]];

    console.log(player);

    const scoreTimeline = currentGame.scoreTimeline.slice(0);
    scoreTimeline.push({
      goalScorer: position,
      timestamp: new Date(),
      name: player.name
    });

    dispatch(updateCurrentGame(Object.assign({}, currentGame, {
      scoreTimeline
    })));
  };

  renderScoreButton = (score, player, position) => {
    const buttonStyle = {height: 50};
    return (
        <RaisedButton
          className="score-button"
          disabled={this.props.currentGame.isFinished}
          onClick={this.handleScoreButtonClick(position)}
          buttonStyle={buttonStyle}
          label={player.name} />
    );
  }
}

const mapStateToProps = state => ({
  players: state.players,
  currentGame: state.currentGame
});

const _GameScoreScreen = connect(mapStateToProps)(GameScoreScreen);

export default _GameScoreScreen;
