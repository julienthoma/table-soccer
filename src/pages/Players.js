import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameList from '../components/GameList';
import { browserHistory } from 'react-router'
import PlayerList from '../components/PlayerList';

class Players extends Component {
  handleRowClick = game => () => {
    //browserHistory.push('/game/' + game.id);
  };

  render() {
    const { players, games } = this.props;

    return (
      <PlayerList games={games} players={players} handleRowClick={this.handleRowClick()} />
    );
  };
}

const mapStateToProps = state => ({
  games: state.games,
  players: state.players
});

const _Players = connect(mapStateToProps)(Players);

export default _Players;
