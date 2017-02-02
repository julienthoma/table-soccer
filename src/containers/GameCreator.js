import React, { Component } from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { updateCurrentGame, saveGame } from '../actions';
import Subheader from 'material-ui/Subheader';
import GameScoreScreen from './GameScoreScreen';
import { browserHistory } from 'react-router'
import { CURRENT_GAME } from '../presets';


import { TEAM1_FRONT_PLAYER, TEAM1_REAR_PLAYER, TEAM2_FRONT_PLAYER, TEAM2_REAR_PLAYER } from '../constants';;

import { Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper';

class GameCreator extends Component {
  render() {
    const { currentGame } = this.props;

    return (
          <Stepper
              activeStep={currentGame.stepperIndex}
              orientation="vertical"
          >
            {this.renderStep1()}
            {this.renderStep2()}
            {this.renderStepActions(currentGame.stepperIndex)}
          </Stepper>
    );
  };

  createGame = () => {
    const { startdate, enddate, winners, losers, scoreTimeline } = this.props.currentGame;

    return {
      startdate,
      enddate,
      winners,
      losers,
      scoreTimeline
    };
  };

  handleNext = () => {
    const { dispatch, currentGame } = this.props;
    const stepperIndex = currentGame.stepperIndex + 1;
    const newProps = { stepperIndex };

    if (stepperIndex === 1) {
      newProps.startdate = new Date();
      console.log('startGame');
    }

    dispatch(updateCurrentGame(Object.assign({}, currentGame, newProps)));

    if (stepperIndex === 2) {
      console.log('save game');
      dispatch(saveGame(this.createGame()));
      dispatch(updateCurrentGame(CURRENT_GAME));
      browserHistory.push('/games');

    }
  };

  handlePrev = () => {
    const { dispatch, currentGame } = this.props;
    const stepperIndex = currentGame.stepperIndex - 1;

    dispatch(updateCurrentGame(Object.assign({}, currentGame, { stepperIndex })))
  };

  renderStepActions = (step) => {
    const stepperIndex = this.props.currentGame.stepperIndex;
    const isFinished = this.props.currentGame.isFinished;

    return (
      <div style={{margin: '12px 0'}}>
        {step > 0 && (
          <RaisedButton
            label="Back"
            disabled={stepperIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
            style={{marginRight: 30}}
          />
        )}
        <RaisedButton
          label={stepperIndex === 0 ? 'Start Game' : 'Save Game'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          disabled={!this.isValidPlayerCombo() ||(stepperIndex === 1 && !isFinished)}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />

        {
          !this.isValidPlayerCombo() &&
          <h4>Spieler mehrfach ausgewählt</h4>
        }
      </div>
    );
  }


  renderPlayerItems = players => players.map((player, index) =>
    <MenuItem value={index} key={index} primaryText={player.name} />
  )

  renderStep1 = () => {
    const { players, dispatch, currentGame } = this.props;
    const selectPlayer = position => (evt, playerIndex) => {
      dispatch(updateCurrentGame(Object.assign({}, currentGame, {
        [position]: playerIndex
      })));
    };
    const fieldStyle = {
      margin: '0 30px 30px 0'
    };

    return (
      <Step>
        <StepLabel>Select Players</StepLabel>
        <StepContent>
          <Subheader style={{fontSize: 16, paddingLeft: 0}}>TEAM 1</Subheader>

          <SelectField
            value={currentGame[TEAM1_FRONT_PLAYER]}
            floatingLabelText="STURM"
            onChange={selectPlayer(TEAM1_FRONT_PLAYER)}
            style={fieldStyle}
          >
            {this.renderPlayerItems(players)}
          </SelectField>

          <SelectField
            value={currentGame[TEAM1_REAR_PLAYER]}
            floatingLabelText="ABWEHR"
            onChange={selectPlayer(TEAM1_REAR_PLAYER)}
            style={fieldStyle}
          >
            {this.renderPlayerItems(players)}
          </SelectField>

          <Subheader style={{fontSize: 16, paddingLeft: 0}}>TEAM 2</Subheader>

          <SelectField
            value={currentGame[TEAM2_FRONT_PLAYER]}
            floatingLabelText="STURM"
            onChange={selectPlayer(TEAM2_FRONT_PLAYER)}
            style={fieldStyle}
          >
            {this.renderPlayerItems(players)}
          </SelectField>

          <SelectField
            value={currentGame[TEAM2_REAR_PLAYER]}
            floatingLabelText="ABWEHR"
            onChange={selectPlayer(TEAM2_REAR_PLAYER)}
            style={fieldStyle}
          >
            {this.renderPlayerItems(players)}
          </SelectField>
        </StepContent>
      </Step>
    );
  }

  renderStep2 = () => {
    const { currentGame, players } = this.props;

    return (
      <Step>
        <StepLabel>Play Game</StepLabel>
        <StepContent>
          <GameScoreScreen />
        </StepContent>
      </Step>
    );
  };

  isValidPlayerCombo = () => {
    const { currentGame } = this.props;
    const set = new Set([
      currentGame[TEAM1_FRONT_PLAYER],
      currentGame[TEAM1_REAR_PLAYER],
      currentGame[TEAM2_FRONT_PLAYER],
      currentGame[TEAM2_REAR_PLAYER]
    ]);

    return set.size === 4;
  }
}


const mapStateToProps = state => ({
  players: state.players,
  currentGame: state.currentGame
});

const _GameCreator = connect(mapStateToProps)(GameCreator);

export default _GameCreator;
