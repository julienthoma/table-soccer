import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameDetail from '../components/GameDetail';
import { gameShape } from '../proptypes';

const Game = ({ games, params }) => {
  const [game] = games.filter(_game => _game.id === params.id);

  return (
    <div style={{ padding: 8 }}>
      <GameDetail game={game} />
    </div>
  );
};

Game.propTypes = {
  games: PropTypes.arrayOf(gameShape).isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};

const mapStateToProps = ({ app }) => ({
  games: app.games
});

export default connect(mapStateToProps)(Game);
