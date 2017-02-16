import React, { Component } from 'react';
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { selectPlayer } from '../actions';
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
    const fieldStyle = {width: 'calc(50% - 5px)', marginBottom: 10, height: 180,
      position: 'relative', borderRadius: 2};

    const team1FrontPlayer = game[TEAM1_FRONT_PLAYER];
    const team1RearPlayer = game[TEAM1_REAR_PLAYER];
    const team2FrontPlayer = game[TEAM2_FRONT_PLAYER];
    const team2RearPlayer = game[TEAM2_REAR_PLAYER];
    const containerStyle = {display: 'flex', flexWrap: 'wrap', flexDirection: 'row-reverse', justifyContent: 'space-between'};
    const selectStyle = {width: 'calc(100% - 6px)', margin: '40px 3px 0 3px', color: 'white'}
    const labelStyle = {color: 'white', textTransform: 'uppercase', paddingRight: 45, fontSize: 14}
    const reverseOrder = game.reverseOrder;

    const team1Classes = 'team1 ' + (reverseOrder ? 'botitems' : 'topitems');
    const team2Classes = 'team2 ' + (reverseOrder ? 'topitems' : 'botitems');

    return (
      <div>
        <div style={containerStyle}>
          <div style={fieldStyle} className={team1Classes}>
            <SelectField
              value={team1FrontPlayer}
              floatingLabelText="STURM"
              onChange={this.selectPlayerPosition(TEAM1_FRONT_PLAYER)}
              style={selectStyle}
              labelStyle={labelStyle}
            >
              {this.renderPlayerItems(players)}
            </SelectField>
          </div>

          <div style={fieldStyle} className={team1Classes}>
            <SelectField
              value={team1RearPlayer}
              floatingLabelText="ABWEHR"
              onChange={this.selectPlayerPosition(TEAM1_REAR_PLAYER)}
              style={selectStyle}
              labelStyle={labelStyle}
            >
              {this.renderPlayerItems(players)}
            </SelectField>
          </div>

          <div style={fieldStyle} className={team2Classes}>
            <SelectField
              value={team2RearPlayer}
              floatingLabelText="ABWEHR"
              onChange={this.selectPlayerPosition(TEAM2_REAR_PLAYER)}
              style={selectStyle}
              labelStyle={labelStyle}
            >
              {this.renderPlayerItems(players)}
            </SelectField>
          </div>

          <div style={fieldStyle} className={team2Classes}>
            <SelectField
              value={team2FrontPlayer}
              floatingLabelText="STURM"
              onChange={this.selectPlayerPosition(TEAM2_FRONT_PLAYER)}
              style={selectStyle}
              labelStyle={labelStyle}
            >
              {this.renderPlayerItems(players)}
            </SelectField>
          </div>
        </div>
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
