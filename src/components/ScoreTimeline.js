import React from 'react';
import { gameShape } from '../proptypes';
import ScoreTimelineItem from './ScoreTimelineItem';
import ScoreTimelineSubheadline from './ScoreTimelineSubheadline';
import { Box } from '.';

const ScoreTimeline = ({ game }) => (
  <Box mt={3}>
    <ScoreTimelineSubheadline
      date={game.startdate}
      winnerScore={0}
      loserScore={0}
    />
    {game.timeline.map((item, index) => (
      <div key={index}>
        <ScoreTimelineItem
          goalScorer={item}
          isWinner={game.players[item.id].isWinner}
        />
      </div>
    ))}
  </Box>
);

ScoreTimeline.propTypes = {
  game: gameShape.isRequired
};

export default ScoreTimeline;
