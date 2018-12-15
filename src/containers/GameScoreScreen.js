import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Settings from 'material-ui/svg-icons/action/settings';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { getScore } from '../services/Helper';
import PlayerButton from '../components/PlayerButton';
import {
  addGoal,
  addOwnGoal,
  uploadGame,
  undoLastGoal,
  toggleSnackbar,
  exitGame,
  rotateScreen
} from '../actions';
import { scoreTimelineItemShape, simplePlayerShape } from '../proptypes';
import './GameScoreScreen.scss';
import * as consts from '../constants';

class GameScoreScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsOpen: false,
      dialogOpen: false
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
    const [team1Score, team2Score] = getScore(score);
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
        scoreTimeline
      ])
    );
  };

  handleUndo = index => () => {
    this.props.dispatch(undoLastGoal(index));
  };

  handleSettingsOpen = event => {
    event.preventDefault();
    this.setState({
      settingsOpen: true,
      anchorEl: event.currentTarget
    });
  };

  handleSettingsClose = () => {
    this.setState({
      settingsOpen: false
    });
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleOwnGoalClick = index => () => {
    const { currentPlayers, dispatch } = this.props;
    const currentPlayer = currentPlayers[index];
    dispatch(addOwnGoal(index));
    dispatch(
      toggleSnackbar(
        `OWN GOAL ${currentPlayer.name}`,
        'UNDO',
        this.handleUndo(index)
      )
    );
    this.handleSettingsClose();
  };

  handleScoreButtonClick = (index, position) => () => {
    const { currentPlayers, dispatch } = this.props;
    const currentPlayer = currentPlayers[index];
    dispatch(addGoal(index, position));
    dispatch(
      toggleSnackbar(
        `${currentPlayer.name} - ${position}`,
        'UNDO',
        this.handleUndo(index)
      )
    );
  };

  renderDialog = () => {
    {
      const actions = [
        <FlatButton
          label="No, Continue Game"
          primary
          onClick={this.handleDialogClose}
        />,
        <FlatButton
          label="Exit"
          secondary
          onClick={() => {
            this.handleDialogClose();
            this.props.dispatch(exitGame());
          }}
        />
      ];

      return (
        <div>
          <Dialog
            title="Exit Current Game"
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleDialogClose}
          >
            Do you really want to exit the game? All progress will be lost.
          </Dialog>
        </div>
      );
    }
  };

  render() {
    const { currentPlayers, score, isUpsideDown } = this.props;
    const [team1Score, team2Score] = getScore(score);
    const [p1, p2, p3, p4] = currentPlayers;
    const buttonStyle = {
      position: 'fixed',
      bottom: 20,
      right: 20
    };

    return (
      <div>
        <div styleName="game">
          <div styleName="scoreContainer">
            <h1 styleName="score team1">{team1Score}</h1>
            <h1 styleName="score team2">{team2Score}</h1>
          </div>
          <div>
            {isUpsideDown ? (
              <div styleName="players">
                <PlayerButton
                  name={p3.name}
                  team={'team2'}
                  upperCount={3}
                  lowerCount={5}
                  disabled={this.props.isFinished}
                  handleLowerClick={this.handleScoreButtonClick(
                    2,
                    consts.POSITION_MIDFILED
                  )}
                  handleUpperClick={this.handleScoreButtonClick(
                    2,
                    consts.POSITION_STRIKER
                  )}
                />
                <PlayerButton
                  name={p4.name}
                  team={'team2'}
                  upperCount={1}
                  lowerCount={2}
                  disabled={this.props.isFinished}
                  handleLowerClick={this.handleScoreButtonClick(
                    3,
                    consts.POSITION_DEFENSE
                  )}
                  handleUpperClick={this.handleScoreButtonClick(
                    3,
                    consts.POSITION_KEEPER
                  )}
                  className="rotate--topLeft"
                />
                <PlayerButton
                  name={p2.name}
                  team={'team1'}
                  upperCount={2}
                  lowerCount={1}
                  disabled={this.props.isFinished}
                  handleLowerClick={this.handleScoreButtonClick(
                    1,
                    consts.POSITION_KEEPER
                  )}
                  handleUpperClick={this.handleScoreButtonClick(
                    1,
                    consts.POSITION_DEFENSE
                  )}
                  className="rotate--topLeft"
                />
                <PlayerButton
                  name={p1.name}
                  team={'team1'}
                  upperCount={5}
                  lowerCount={3}
                  disabled={this.props.isFinished}
                  handleLowerClick={this.handleScoreButtonClick(
                    0,
                    consts.POSITION_STRIKER
                  )}
                  handleUpperClick={this.handleScoreButtonClick(
                    0,
                    consts.POSITION_MIDFILED
                  )}
                />
              </div>
            ) : (
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
                  name={p4.name}
                  team={'team2'}
                  upperCount={2}
                  lowerCount={1}
                  disabled={this.props.isFinished}
                  handleUpperClick={this.handleScoreButtonClick(
                    3,
                    consts.POSITION_DEFENSE
                  )}
                  handleLowerClick={this.handleScoreButtonClick(
                    3,
                    consts.POSITION_KEEPER
                  )}
                  className="rotate--topLeft"
                />
                <PlayerButton
                  name={p3.name}
                  team={'team2'}
                  upperCount={5}
                  lowerCount={3}
                  disabled={this.props.isFinished}
                  handleUpperClick={this.handleScoreButtonClick(
                    2,
                    consts.POSITION_MIDFILED
                  )}
                  handleLowerClick={this.handleScoreButtonClick(
                    2,
                    consts.POSITION_STRIKER
                  )}
                />
              </div>
            )}
          </div>
        </div>

        <div styleName="footer">
          <FloatingActionButton
            style={buttonStyle}
            onClick={this.handleSettingsOpen}
          >
            <Settings />
          </FloatingActionButton>
          <Popover
            open={this.state.settingsOpen}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.handleSettingsClose}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <Menu>
              {currentPlayers.map((player, index) => (
                <MenuItem
                  key={index}
                  primaryText={`Own goal: ${player.name}`}
                  onClick={this.handleOwnGoalClick(index)}
                />
              ))}
              <Divider />
              <MenuItem
                key={4}
                primaryText="Rotate upside down"
                onClick={() => {
                  this.props.dispatch(rotateScreen());
                  this.handleSettingsClose();
                }}
              />
              <Divider />
              <MenuItem
                key={5}
                primaryText="Exit Game"
                onClick={() => {
                  this.handleSettingsClose();
                  this.handleDialogOpen();
                }}
              />
            </Menu>
          </Popover>
          {this.renderDialog()}
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
  currentPlayers: PropTypes.arrayOf(simplePlayerShape).isRequired,
  isUpsideDown: PropTypes.bool.isRequired
};

const mapStateToProps = ({ game }) => ({
  currentPlayers: game.players,
  scoreTimeline: game.scoreTimeline,
  isFinished: game.isFinished,
  score: game.score,
  isUpsideDown: game.isUpsideDown
});

export default connect(mapStateToProps)(GameScoreScreen);
