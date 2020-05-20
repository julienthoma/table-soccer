import React from 'react';
import PropTypes from 'prop-types';
import PositionIcon from './PositionIcon';
import { POSITION_COUNT } from '../constants';
import { scoreTimelineItemShape } from '../proptypes';

const ScoreTimelineGoalScorer = ({ goalScorer, isWinner }) => (
  <div>
    <div className="score-timeline-item__goalscorer">
      <div className="team1score">
        {isWinner ? (
          <div>
            <div>
              {(goalScorer.position === 'KEEPER' || goalScorer.position === 'DEFENSE') ? <span>🛡</span> : <span>⚔️</span>}
              &nbsp;
              {goalScorer.name}

              {goalScorer.ownGoal ? (
                <div className="score-timeline-item__owngoal">🐓🐓🐓OWN GOAL🐓🐓🐓</div>
              ) : (
                <PositionIcon
                  dark
                  count={POSITION_COUNT[goalScorer.position]}
                />
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="team2score">
        {!isWinner ? (
          <div>
            <div>
            {goalScorer.name}
            &nbsp;
            {(goalScorer.position === 'KEEPER' || goalScorer.position === 'DEFENSE') ? <span>🛡</span> : <span>⚔️</span>}

              {goalScorer.ownGoal ? (
                <div className="score-timeline-item__owngoal">🐓🐓🐓OWN GOAL🐓🐓🐓</div>
              ) : (
                <PositionIcon
                  dark
                  count={POSITION_COUNT[goalScorer.position]}
                />
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>

    <div className="score-timeline-item__subheadline">
      <div className="score-timeline-item__time">{goalScorer.time} sec</div>
      <div className="score-timeline-item__score">{`${goalScorer.score[0]} : ${
        goalScorer.score[1]
      }`}</div>
    </div>
  </div>
);

ScoreTimelineGoalScorer.propTypes = {
  goalScorer: scoreTimelineItemShape.isRequired,
  isWinner: PropTypes.bool.isRequired
};

export default ScoreTimelineGoalScorer;
