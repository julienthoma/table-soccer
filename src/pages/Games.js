import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameList from '../components/GameList';
import { browserHistory } from 'react-router'

class Games extends Component {
  handleRowClick = game => () => {
    browserHistory.push('/game/' + game.id);
  };

  render() {
    const { games, players } = this.props;


    return (
      <GameList games={games} handleRowClick={this.handleRowClick} players={players}/>
    );
  };
}

const mapStateToProps = state => ({
  games: state.games,
  players: state.players
});

const _Games = connect(mapStateToProps)(Games);

export default _Games;
