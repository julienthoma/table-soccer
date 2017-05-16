import React from 'react';
import ScoreTimelineSubheadline from './ScoreTimelineSubheadline';
import ScoreTimelineGoalScorer from './ScoreTimelineGoalScorer';

const ScoreTimeline = ({ game }) => (
  <div>
    {game.scoreTimeline.map((item, index) => {
      const score = getTempScoreByGame(game, index);

      return (<div key={index}>
        <ScoreTimelineSubheadline
          time={item.timestamp}
          score={score}
        />
        <ScoreTimelineGoalScorer goalScorer={item} />
      </div>);
    })}
  </div>
  );

export default ScoreTimeline;
