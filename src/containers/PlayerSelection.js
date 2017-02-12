import React, { Component } from 'react';
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { selectPlayer } from '../actions';
import Subheader from 'material-ui/Subheader';
import { TEAM1_FRONT_PLAYER, TEAM1_REAR_PLAYER, TEAM2_FRONT_PLAYER, TEAM2_REAR_PLAYER } from '../constants';

class PlayerSelection extends Component {
  componentWillMount() {
    const { players, dispatch } = this.props;

    dispatch(selectPlayer(players[0].name, TEAM1_FRONT_PLAYER));
    dispatch(selectPlayer(players[1].name, TEAM1_REAR_PLAYER));
    dispatch(selectPlayer(players[2].name, TEAM2_FRONT_PLAYER));
    dispatch(selectPlayer(players[3].name, TEAM2_REAR_PLAYER));
  }

  render() {
    const { players, game } = this.props;
    const fieldStyle = {
      margin: '0 15px 0 0'
    };

    const team1FrontPlayer = game[TEAM1_FRONT_PLAYER];
    const team1RearPlayer = game[TEAM1_REAR_PLAYER];
    const team2FrontPlayer = game[TEAM2_FRONT_PLAYER];
    const team2RearPlayer = game[TEAM2_REAR_PLAYER];

    console.log(team1FrontPlayer);

    return (
      <div>
        <Subheader style={{fontSize: 16, paddingLeft: 0, lineHeight: '24px'}}>TEAM 1</Subheader>

        <SelectField
          value={team1FrontPlayer}
          floatingLabelText="STURM"
          onChange={this.selectPlayerPosition(TEAM1_FRONT_PLAYER)}
          style={fieldStyle}
        >
          {this.renderPlayerItems(players)}
        </SelectField>

        <SelectField
          value={team1RearPlayer}
          floatingLabelText="ABWEHR"
          onChange={this.selectPlayerPosition(TEAM1_REAR_PLAYER)}
          style={fieldStyle}
        >
          {this.renderPlayerItems(players)}
        </SelectField>

        <Subheader style={{fontSize: 16, paddingLeft: 0, lineHeight: '24px'}}>TEAM 2</Subheader>

        <SelectField
          value={team2FrontPlayer}
          floatingLabelText="STURM"
          onChange={this.selectPlayerPosition(TEAM2_FRONT_PLAYER)}
          style={fieldStyle}
        >
          {this.renderPlayerItems(players)}
        </SelectField>

        <SelectField
          value={team2RearPlayer}
          floatingLabelText="ABWEHR"
          onChange={this.selectPlayerPosition(TEAM2_REAR_PLAYER)}
          style={fieldStyle}
        >
          {this.renderPlayerItems(players)}
        </SelectField>
      </div>
    );
  }

  renderPlayerItems = players => players.map((player, index) =>
    <MenuItem value={player.name} key={index} primaryText={player.name} />
  );

  selectPlayerPosition = position => (evt, playerIndex, value) => {
    const { dispatch } = this.props;
    dispatch(selectPlayer(value, position));
  };
}

const mapStateToProps = state => ({
  players: state.players,
  game: state.newGame
});

const _PlayerSelection = connect(mapStateToProps)(PlayerSelection);

export default _PlayerSelection;
