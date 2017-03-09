import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameList from '../components/GameList';
import { browserHistory } from 'react-router'
import GameCollection from '../collections/GameCollection';
import Combos from './Combos';

class Games extends Component {
  handleRowClick = game => () => {
    browserHistory.push('/game/' + game.id);
  };

  render() {
    const { games } = this.props;

    return (
        <GameList games={new GameCollection(games)} handleRowClick={this.handleRowClick} />
    );
  };
}

const mapStateToProps = state => ({
  games: state.games,
  players: state.players
});

const _Games = connect(mapStateToProps)(Games);

export default _Games;
