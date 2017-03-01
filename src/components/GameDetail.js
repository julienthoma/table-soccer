import React from 'react';
import ScoreTimeline from '../components/ScoreTimeline';
import GameListItem from '../components/GameListItem';

const GameDetail = ({ game, players }) => {

  const startdate = new Date(game.startdate);
  const enddate = new Date(game.enddate);

  return (
    <div>
      <GameListItem game={game} handleClick={() => false} />
      <ScoreTimeline game={game} players={players} />
    </div>
  );
};

export default GameDetail;
