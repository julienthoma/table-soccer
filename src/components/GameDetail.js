import React from 'react';
import GameListItem from '../components/GameListItem';

const GameDetail = ({ game }) => (
  <div>
    <GameListItem game={game} handleClick={() => false} />
    <span>Score Timeline coming back soon</span>
  </div>
);

GameDetail.propTypes = {};

export default GameDetail;
