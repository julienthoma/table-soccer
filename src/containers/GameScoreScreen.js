import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { TEAM1_FRONT_PLAYER, TEAM1_REAR_PLAYER, TEAM2_FRONT_PLAYER, TEAM2_REAR_PLAYER, FRONT_PLAYER, REAR_PLAYER } from '../constants';
import RaisedButton from 'material-ui/RaisedButton';
import { addGoal, saveGame, endGame, undoLastGoal, cancelGame } from '../actions';
import { getScoreByPosition, getPlayerByName, applyFnForPositions } from '../helper';
import { browserHistory } from 'react-router'
import Snackbar from 'material-ui/Snackbar';
import { getPlayerByPosition } from '../helper';

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

    dispatch(saveGame({
      startdate: game.startdate,
      enddate: new Date(),
      scoreTimeline: game.scoreTimeline,
      winners,
      losers
    }));

    dispatch(cancelGame());
    browserHistory.push('/');
  };

  render() {
    const { game } = this.props;
    const snackBarOpen = game.snackBarOpen;
    const [t1RearScore, t1FrontScore, t2FrontScore, t2RearScore] = applyFnForPositions(getScoreByPosition);
    const buttonStyle = {height: 180};
    const labelStyle = {fontSize: 20};
    const outerStyle = {width: 'calc(50% - 5px)', marginBottom: 10};
    const containerStyle = {display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'};
    const reverseOrder = game.reverseOrder;
    const team1Classes = 'team1 ' + (reverseOrder ? 'botitems' : 'topitems');
    const team2Classes = 'team2 ' + (reverseOrder ? 'topitems' : 'botitems');

    return (
      <div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
        <div className="score" style={{display: 'flex', marginBottom: 10, justifyContent: 'center', fontFamily: 'Roboto'}}>
          <h1 className="team1score">{t1FrontScore + t1RearScore}</h1>
          <h1 className="team2score">{t2RearScore + t2FrontScore}</h1>
        </div>
        <div style={containerStyle}>
          <RaisedButton
            className={team1Classes}
            disabled={this.props.game.isFinished}
            primary={true}
            onClick={this.handleScoreButtonClick(TEAM1_FRONT_PLAYER)}
            buttonStyle={buttonStyle}
            style={outerStyle}
            labelStyle={labelStyle}
            label={game[TEAM1_FRONT_PLAYER]}
          />
          <RaisedButton
            className={team1Classes}
            disabled={this.props.game.isFinished}
            primary={true}
            onClick={this.handleScoreButtonClick(TEAM1_REAR_PLAYER)}
            buttonStyle={buttonStyle}
            style={outerStyle}
            labelStyle={labelStyle}
            label={game[TEAM1_REAR_PLAYER]}
          />
          <RaisedButton
            className={team2Classes}
            disabled={this.props.game.isFinished}
            secondary={true}
            onClick={this.handleScoreButtonClick(TEAM2_FRONT_PLAYER)}
            buttonStyle={buttonStyle}
            style={outerStyle}
            labelStyle={labelStyle}
            label={game[TEAM2_FRONT_PLAYER]}
          />
          <RaisedButton
            className={team2Classes}
            disabled={this.props.game.isFinished}
            secondary={true}
            onClick={this.handleScoreButtonClick(TEAM2_REAR_PLAYER)}
            buttonStyle={buttonStyle}
            style={outerStyle}
            labelStyle={labelStyle}
            label={game[TEAM2_REAR_PLAYER]}
          />
        </div>
        <Snackbar
          className='undoContainer'
          bodyStyle={{height: '100%'}}
          style={{height: '100%'}}
          open={snackBarOpen}
          message={this.getGoalScorerText()}
          action="undo"
          autoHideDuration={5000}
          onActionTouchTap={this.handleUndo}
        />
      </div>
    );
  }

  getGoalScorerText = () => {
    const { game } = this.props;

    if (game.scoreTimeline.length === 0) {
      return '';
    }

    const lastGoal = game.scoreTimeline[game.scoreTimeline.length - 1];
    const goalScorer = getPlayerByPosition(lastGoal.position);

    return (<div style={{marginBottom: 200, fontSize: 24}}>{`${goalScorer.name} scored a goal!`}</div>);
  }

  handleUndo = () => {
    this.props.dispatch(undoLastGoal());
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
