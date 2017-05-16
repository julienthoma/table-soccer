import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import GameList from '../components/GameList';
import gameShape from '../proptypes';

class Games extends React.Component {
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

Games.propTypes = {
  games: React.PropTypes.arrayOf(React.PropTypes.shape(gameShape)).isRequired
};

const mapStateToProps = state => ({
  games: state.app.games
});

const _Games = connect(mapStateToProps)(Games);

export default _Games;
