import React from 'react';
import GameListItem from '../components/GameListItem';
import { gameShape } from '../proptypes';

const GameDetail = ({ game }) => (
  <div>
    <GameListItem game={game} handleClick={() => false} />
    <span>Score Timeline coming back soon</span>
  </div>
);

GameDetail.propTypes = {
  game: React.PropTypes.shape(gameShape).isRequired
};

export default GameDetail;
