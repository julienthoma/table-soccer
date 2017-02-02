import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameList from '../components/GameList';
import { browserHistory } from 'react-router'

class Games extends Component {

  handleRowClick = game => () => {
    console.log(game);

    browserHistory.push('/game/' + game.id);
  }

  render() {
    const { games } = this.props;


    return (
      <GameList games={games} handleRowClick={this.handleRowClick}/>
    );
  };
}

const mapStateToProps = state => ({
  games: state.games
});

const _Games = connect(mapStateToProps)(Games);

export default _Games;
