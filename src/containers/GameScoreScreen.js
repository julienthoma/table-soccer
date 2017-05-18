import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import RaisedButton from 'material-ui/RaisedButton';
import { addGoal, uploadGame, undoLastGoal, toggleSnackbar } from '../actions';
import { scoreTimelineItemShape, simplePlayerShape } from '../proptypes';

class GameScoreScreen extends React.Component {
  componentDidUpdate = () => {
    const { dispatch, currentPlayers, scoreTimeline, score, isFinished } = this.props;
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

    dispatch(uploadGame([
      shortid.generate(),
      new Date().getTime(),
      scoreTimeline[scoreTimeline.length - 1].time,
      playerIds,
      playerScores,
      scoreTimeline.map(item => [item.id, item.index, item.time])
    ]));
  };

  handleUndo = index => () => {
    this.props.dispatch(undoLastGoal(index));
  }

  handleScoreButtonClick = index => () => {
    this.props.dispatch(addGoal(index));
    this.props.dispatch(toggleSnackbar('GOOOOOAL!!!!!', 'UNDO', this.handleUndo(index)));
  };

  render() {
    const { currentPlayers, score } = this.props;
    const containerStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' };
    const [p1Score, p2Score, p3Score, p4Score] = score;
    const team1Score = p1Score + p2Score;
    const team2Score = p3Score + p4Score;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
        <div
          className="score"
          style={{ display: 'flex', marginBottom: 10, justifyContent: 'center', fontFamily: 'Roboto' }}
        >
          <h1 className="team1score">{team1Score}</h1>
          <h1 className="team2score">{team2Score}</h1>
        </div>
        <div style={containerStyle} className="player-selection">
          {
            currentPlayers.map((player, index) => (
              <RaisedButton
                disabled={this.props.isFinished}
                primary={index <= 1}
                secondary={index > 1}
                onClick={this.handleScoreButtonClick(index)}
                buttonStyle={{ height: 180 }}
                style={{ width: 'calc(50% - 5px)', marginBottom: 10 }}
                labelStyle={{ fontSize: 20 }}
                label={player.name}
                key={player.id}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

GameScoreScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isFinished: React.PropTypes.bool.isRequired,
  score: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  scoreTimeline: React.PropTypes.arrayOf(React.PropTypes.shape(scoreTimelineItemShape)).isRequired,
  currentPlayers: React.PropTypes.arrayOf(React.PropTypes.shape(simplePlayerShape)).isRequired
};

const mapStateToProps = state => ({
  currentPlayers: state.game.players,
  scoreTimeline: state.game.scoreTimeline,
  isFinished: state.game.isFinished,
  score: state.game.score
});

const _GameScoreScreen = connect(mapStateToProps)(GameScoreScreen);

export default _GameScoreScreen;
