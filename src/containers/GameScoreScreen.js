import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import RaisedButton from 'material-ui/RaisedButton';
import PlayerButton from '../components/PlayerButton';
import { addGoal, uploadGame, undoLastGoal, toggleSnackbar } from '../actions';
import { scoreTimelineItemShape, simplePlayerShape } from '../proptypes';
import './GameScoreScreen.scss';

class GameScoreScreen extends React.Component {
  componentDidUpdate = () => {
    const {
      dispatch,
      currentPlayers,
      scoreTimeline,
      score,
      isFinished
    } = this.props;
    const [p1Score, p2Score, p3Score, p4Score] = score;
    const team1Score = p1Score + p2Score;
    const team2Score = p3Score + p4Score;
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
      playerScores = [p1Score, p2Score, p3Score, p4Score];
      playerIds = [p1.id, p2.id, p3.id, p4.id];
    } else {
      playerScores = [p3Score, p4Score, p1Score, p2Score];
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

  handleUndo = index => () => {
    this.props.dispatch(undoLastGoal(index));
  };

  handleScoreButtonClick = index => () => {
    this.props.dispatch(addGoal(index));
    this.props.dispatch(
      toggleSnackbar('GOOOOOAL!!!!!', 'UNDO', this.handleUndo(index))
    );
  };

  render() {
    const { currentPlayers, score } = this.props;
    const [p1Score, p2Score, p3Score, p4Score] = score;
    const team1Score = p1Score + p2Score;
    const team2Score = p3Score + p4Score;
    const playerIconCount = [
      [3, 5],
      [2, 1],
      [1, 2],
      [5, 3]
    ];

    return (
      <div styleName="root">
        <div styleName="scoreContainer">
          <h1 styleName="score team1">{team1Score}</h1>
          <h1 styleName="score team2">{team2Score}</h1>
        </div>
        <div styleName="players">
          {currentPlayers.map((player, index) =>
            <PlayerButton
              key={player.id}
              name={player.name}
              team={index <= 1 ? 'team1' : 'team2'}
              upperCount={playerIconCount[index][0]}
              lowerCount={playerIconCount[index][1]}
              disabled={this.props.isFinished}
              handleUpperClick={() => console.log('upperclick')}
              handleLowerClick={() => console.log('lowerlick')}
            />
          )}
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
