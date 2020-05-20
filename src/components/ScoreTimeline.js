import React from 'react';
import { FormattedDate } from 'react-intl';
import { gameShape } from '../proptypes';
import ScoreTimelineItem from './ScoreTimelineItem';

const ScoreTimeline = ({ game }) => (
  <div>
    <br />
    <br />
    <div className="score-time-line__subheadline">
      <div className="score-time-line__time">
        <FormattedDate value={game.startdate} hour="2-digit" minute="2-digit" />
      </div>
      <div className="score-time-line__score">0 : 0</div>
    </div>
    {game.timeline.map((item, index) => (
      <div key={index}>
        <ScoreTimelineItem
          goalScorer={item}
          isWinner={game.players[item.id].isWinner}
        />
      </div>
    ))}
  </div>
);

ScoreTimeline.propTypes = {
  game: gameShape.isRequired
};

export default ScoreTimeline;
