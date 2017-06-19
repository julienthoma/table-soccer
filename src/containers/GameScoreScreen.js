import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PlayerButton from '../components/PlayerButton';
import {
  addGoal,
  addOwnGoal,
  uploadGame,
  undoLastGoal,
  toggleSnackbar,
  exitGame
} from '../actions';
import { scoreTimelineItemShape, simplePlayerShape } from '../proptypes';
import './GameScoreScreen.scss';
import * as consts from '../constants';

class GameScoreScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ownGoalsOpen: false
    };
  }

  componentDidUpdate = () => {
    const {
      dispatch,
      currentPlayers,
      scoreTimeline,
      score,
      isFinished
    } = this.props;
    const [p1S, p2S, p3S, p4S, p1Own, p2Own, p3Own, p4Own] = score;
    const [team1Score, team2Score] = this.getScore();
    const [p1, p2, p3, p4] = currentPlayers;

    if (isFinished) {
      return;
    }

    if (team1Score < 6 && team2Score < 6) {
      return;
    }

    let playerScores = [];
    let playerIds = [];

    if (team1Score >= 6) {
      playerScores = [p1S, p2S, p3S, p4S, p1Own, p2Own, p3Own, p4Own];
      playerIds = [p1.id, p2.id, p3.id, p4.id];
    } else {
      playerScores = [p3S, p4S, p1S, p2S, p3Own, p4Own, p1Own, p2Own];
      playerIds = [p3.id, p4.id, p1.id, p2.id];
    }

    dispatch(
      uploadGame([
        shortid.generate(),
        new Date().getTime(),
        scoreTimeline[scoreTimeline.length - 1].time,
        playerIds,
        playerScores,
        scoreTimeline.map(item => [item.id, item.index, item.time])
      ])
    );
  };

  getScore = () => {
    const [p1, p2, p3, p4, p1Own, p2Own, p3Own, p4Own] = this.props.score;

    return [p1 + p2 + p3Own + p4Own, p3 + p4 + p1Own + p2Own];
  }

  handleUndo = index => () => {
    this.props.dispatch(undoLastGoal(index));
  };

  handleOwnGoalOpen = event => {
    this.setState({
      ownGoalsOpen: true,
      anchorEl: event.currentTarget
    });
  };

  handleOwnGoalClose = () => {
    this.setState({
      ownGoalsOpen: false
    });
  };

  handleOwnGoalClick = index => () => {
    const { currentPlayers } = this.props;
    const currentPlayer = currentPlayers[index];
    this.props.dispatch(addOwnGoal(index));
    this.props.dispatch(
      toggleSnackbar(
        `OWN GOAL from ${currentPlayer.name} LOOL!!!`,
        'UNDO',
        this.handleUndo(index)
      )
    );
    this.handleOwnGoalClose();
  };

  handleScoreButtonClick = (index, position) => () => {
    const { currentPlayers } = this.props;
    const currentPlayer = currentPlayers[index];
    this.props.dispatch(addGoal(index, position));
    this.props.dispatch(
      toggleSnackbar(
        `GOAL from ${currentPlayer.name} - pos ${position}`,
        'UNDO',
        this.handleUndo(index)
      )
    );
  };

  render() {
    const { currentPlayers } = this.props;
    const [team1Score, team2Score] = this.getScore();
    const [p1, p2, p3, p4] = currentPlayers;

    return (
      <div>
        <div styleName="game">
          <div styleName="scoreContainer">
            <h1 styleName="score team1">{team1Score}</h1>
            <h1 styleName="score team2">{team2Score}</h1>
          </div>
          <div styleName="players">
            <PlayerButton
              name={p1.name}
              team={'team1'}
              upperCount={3}
              lowerCount={5}
              disabled={this.props.isFinished}
              handleUpperClick={this.handleScoreButtonClick(
                0,
                consts.POSITION_STRIKER
              )}
              handleLowerClick={this.handleScoreButtonClick(
                0,
                consts.POSITION_MIDFILED
              )}
            />

            <PlayerButton
              name={p2.name}
              team={'team1'}
              upperCount={1}
              lowerCount={2}
              disabled={this.props.isFinished}
              handleUpperClick={this.handleScoreButtonClick(
                1,
                consts.POSITION_KEEPER
              )}
              handleLowerClick={this.handleScoreButtonClick(
                1,
                consts.POSITION_DEFENSE
              )}
              className="rotate--topLeft"
            />

            <PlayerButton
              name={p3.name}
              team={'team2'}
              upperCount={2}
              lowerCount={1}
              disabled={this.props.isFinished}
              handleUpperClick={this.handleScoreButtonClick(
                2,
                consts.POSITION_DEFENSE
              )}
              handleLowerClick={this.handleScoreButtonClick(
                2,
                consts.POSITION_KEEPER
              )}
              className="rotate--topLeft"
            />

            <PlayerButton
              name={p4.name}
              team={'team2'}
              upperCount={5}
              lowerCount={3}
              disabled={this.props.isFinished}
              handleUpperClick={this.handleScoreButtonClick(
                3,
                consts.POSITION_MIDFILED
              )}
              handleLowerClick={this.handleScoreButtonClick(
                3,
                consts.POSITION_STRIKER
              )}
            />

          </div>
        </div>

        <div styleName="footer">
          <RaisedButton
            label="Cancel"
            onClick={() => this.props.dispatch(exitGame())}
          />

          <RaisedButton onTouchTap={this.handleOwnGoalOpen} label="own goal" />
          <Popover
            open={this.state.ownGoalsOpen}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.handleOwnGoalClose}
          >
            <Menu>
              {currentPlayers.map((player, index) =>
                <MenuItem
                  primaryText={player.name}
                  onClick={this.handleOwnGoalClick(index)}
                />
              )}
            </Menu>
          </Popover>
        </div>

      </div>
    );
  }
}

GameScoreScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFinished: PropTypes.bool.isRequired,
  score: PropTypes.arrayOf(PropTypes.number).isRequired,
  scoreTimeline: PropTypes.arrayOf(scoreTimelineItemShape).isRequired,
  currentPlayers: PropTypes.arrayOf(simplePlayerShape).isRequired
};

const mapStateToProps = state => ({
  currentPlayers: state.game.players,
  scoreTimeline: state.game.scoreTimeline,
  isFinished: state.game.isFinished,
  score: state.game.score
});

const _GameScoreScreen = connect(mapStateToProps)(GameScoreScreen);

export default _GameScoreScreen;
