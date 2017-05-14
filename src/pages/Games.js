import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import GameList from '../components/GameList';

class Games extends Component {
  handleRowClick = game => () => {
    browserHistory.push(`/game/${game.id}`);
  };

  render() {
    const { games } = this.props;

    return (
      <GameList
        games={[...games].sort((a, b) => new Date(b.startdate).getTime() - new Date(a.startdate).getTime())}
        handleRowClick={this.handleRowClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  games: state.app.games,
  players: state.app.players
});

const _Games = connect(mapStateToProps)(Games);

export default _Games;
