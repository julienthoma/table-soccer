import React, { Component } from 'react';
import GameDetail from '../components/GameDetail';
import { connect } from 'react-redux';

class Game extends Component {

  render() {
    const { games, players } = this.props;

    if (games.length === 0) {
      return false;
    }

    const id = this.props.params.id;
    const [ game ] = games.filter(game => game.id === id);

    return (<GameDetail game={game} players={players}/>);
  }
}

const mapStateToProps = state => ({
  games: state.games,
  players: state.players
});

const _Game = connect(mapStateToProps)(Game);

export default _Game;
