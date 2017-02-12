import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  render() {
    const id = this.props.params.id;

    return (
      <div>{id}</div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games,
  players: state.players
});

const _Player = connect(mapStateToProps)(Player);

export default _Player;
