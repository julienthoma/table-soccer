import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { setPlayers } from '../actions';
import { gamePlayerShape, playerShape } from '../proptypes';
import './PlayerSelection.scss';

class PlayerSelection extends React.Component {
  componentWillMount() {
    if (this.props.currentPlayers.length === 0) {
      this.props.dispatch(
        setPlayers([
          this.createSimplePlayer(0),
          this.createSimplePlayer(1),
          this.createSimplePlayer(2),
          this.createSimplePlayer(3)
        ])
      );
    }
  }

  createSimplePlayer = index => {
    const player = this.props.players[index];

    return {
      name: player.name,
      id: player.id,
      index
    };
  };

  changePlayer = index => (evt, playerIndex) => {
    const { dispatch, currentPlayers } = this.props;
    const newPlayers = [...currentPlayers];
    newPlayers[index] = this.createSimplePlayer(playerIndex);
    dispatch(setPlayers(newPlayers));
  };

  // TODO: fix redundant render
  render() {
    const { players, currentPlayers } = this.props;
    const fieldStyle = {
      width: 'calc(50% - 5px)',
      marginBottom: 10,
      height: 180,
      position: 'relative',
      borderRadius: 2
    };

    const containerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between'
    };
    const selectStyle = {
      width: 'calc(100% - 6px)',
      margin: '40px 3px 0 3px',
      color: 'white'
    };
    const labelStyle = {
      color: 'white',
      textTransform: 'uppercase',
      paddingRight: 45,
      fontSize: 14
    };
    return (
      <div style={containerStyle} styleName="root">
        {currentPlayers.map((player, index) =>
          <div style={fieldStyle} key={index}>
            <SelectField
              floatingLabelText={index % 2 === 0 ? 'Attack' : 'Defense'}
              value={player.index}
              onChange={this.changePlayer(index)}
              style={selectStyle}
              labelStyle={labelStyle}
            >
              {players.map((_player, _index) =>
                <MenuItem
                  value={_index}
                  key={_player.id}
                  primaryText={_player.name}
                />
              )}
            </SelectField>
          </div>
        )}
      </div>
    );
  }
}

PlayerSelection.defaultProps = {
  currentPlayers: []
};

PlayerSelection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPlayers: PropTypes.arrayOf(gamePlayerShape).isRequired,
  players: PropTypes.arrayOf(playerShape).isRequired
};

const mapStateToProps = state => ({
  players: state.app.players,
  currentPlayers: state.game.players
});

const _PlayerSelection = connect(mapStateToProps)(PlayerSelection);

export default _PlayerSelection;
