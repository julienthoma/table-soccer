import React from 'react';
import CompletedGameListItem from '../components/CompletedGameListItem';
import ScoreTimeline from '../components/ScoreTimeline';
import { gameShape } from '../proptypes';

const GameDetail = ({ game }) =>
  <div>
    <CompletedGameListItem game={game} />
    <ScoreTimeline game={game} />
  </div>;

GameDetail.propTypes = {
  game: gameShape.isRequired
};

export default GameDetail;
