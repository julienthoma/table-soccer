import React, { Component } from 'react';
import GameCreator from '../containers/GameCreator';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux'

class NewGame extends Component {
  render() {
    const { players } = this.props;

    return (
      <div>
        <Subheader style={{fontSize: 20}}>Neues Game</Subheader>
        {
          players.length > 0 &&
          <GameCreator />
        }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players
});

const _NewGame = connect(mapStateToProps)(NewGame);

export default _NewGame;
