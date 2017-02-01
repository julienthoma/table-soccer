import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { TEAM1_REAR, TEAM1_FRONT, TEAM2_FRONT, TEAM2_REAR } from '../constants';

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

class GameDialog extends Component {
  state = {
    stepIndex: 0,
    [TEAM1_REAR]: 0,
    [TEAM1_FRONT]: 1,
    [TEAM2_REAR]: 2,
    [TEAM2_FRONT]: 3,
  }

  render() {
    const {stepIndex} = this.state;
    return (
        <Dialog
          title="Dialog With Actions"
          modal={false}
          open={true}
        >
          <Stepper
            activeStep={stepIndex}
            orientation="vertical"
          >
            {this.renderStep1()}
            {this.renderStep2()}
            {this.renderStepActions(stepIndex)}
          </Stepper>
        </Dialog>
    );
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions = (step) => {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
      </div>
    );
  }


  renderPlayerItems = players => players.map((player, index) =>
    <MenuItem value={index} key={index} primaryText={player.name} />
  )

  renderStep1 = () => {
    const { players } = this.props;
    const selectPlayer = position => (evt, playerIndex) => {
      console.log(position);
      console.log(playerIndex);
      this.setState(Object.assign({}, this.state, {[position]: playerIndex}))
    }

    return (
      <Step>
        <StepLabel>Select Players</StepLabel>
        <StepContent>
          <SelectField
            value={this.state[TEAM1_REAR]}
            floatingLabelText="Team 1 Tor"
            onChange={selectPlayer(TEAM1_REAR)}
          >
            {this.renderPlayerItems(players)}
          </SelectField>

          <SelectField
            value={this.state[TEAM1_FRONT]}
            floatingLabelText="Team 1 Sturm"
            onChange={selectPlayer(TEAM1_FRONT)}
          >
            {this.renderPlayerItems(players)}
          </SelectField>

          <SelectField
            value={this.state[TEAM2_REAR]}
            floatingLabelText="Team 2 Tor"
            onChange={selectPlayer(TEAM2_REAR)}
          >
            {this.renderPlayerItems(players)}
          </SelectField>

          <SelectField
            value={this.state[TEAM2_FRONT]}
            floatingLabelText="Team 2 Sturm"
            onChange={selectPlayer(TEAM2_FRONT)}
          >
            {this.renderPlayerItems(players)}
          </SelectField>
        </StepContent>
      </Step>
    );
  }

  renderStep2 = () => (
    <Step>
      <StepLabel>Create an ad group</StepLabel>
      <StepContent>
        fubar2
      </StepContent>
    </Step>
  )
}

const mapStateToProps = state => ({
  players: state.players
});

const _GameDialog = connect(mapStateToProps)(GameDialog);

export default _GameDialog;