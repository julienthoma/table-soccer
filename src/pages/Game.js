import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameDetail from '../components/GameDetail';

class Game extends Component {
  render() {
    const { games, players } = this.props;
    const id = this.props.params.id;
    const [game] = games.filter(game => game.id === id);

    return (<GameDetail game={game} players={players} />);
  }
}

const mapStateToProps = state => ({
  games: state.app.games,
  players: state.app.players
});

const _Game = connect(mapStateToProps)(Game);

export default _Game;
