import React from 'react';
import ScoreTimeline from '../components/ScoreTimeline';

const GameDetail = ({ game, players }) => {

  const startdate = new Date(game.startdate);
  const enddate = new Date(game.enddate);

  return (
    <div>
      <ScoreTimeline game={game} players={players}/>
    </div>
  );
};

export default GameDetail;
