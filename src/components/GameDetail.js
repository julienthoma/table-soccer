import React from 'react';
import GameListItem from '../components/GameListItem';
import ScoreTimeline from '../components/ScoreTimeline';
import { gameShape } from '../proptypes';

const GameDetail = ({ game }) =>
  <div>
    <GameListItem game={game} />
    <ScoreTimeline game={game} />
  </div>;

GameDetail.propTypes = {
  game: gameShape.isRequired
};

export default GameDetail;
