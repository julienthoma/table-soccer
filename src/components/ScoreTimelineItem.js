import React from 'react';
import './ScoreTimelineItem.scss';
import PositionIcon from './PositionIcon';
import { POSITION_COUNT } from '../constants/';

const ScoreTimelineGoalScorer = ({ goalScorer, isWinner }) => (
  <div>
    <div styleName="goalscorer">
      <div className="team1score">
        {isWinner
            ? <div>
              <span>
                {goalScorer.name}
                <PositionIcon
                  dark
                  count={POSITION_COUNT[goalScorer.position]}
                />
              </span>
            </div>
            : ''}
      </div>
      <div className="team2score">
        {!isWinner
            ? <div>
              <div>
                {goalScorer.name}
                <PositionIcon
                  dark
                  count={POSITION_COUNT[goalScorer.position]}
                />
              </div>
            </div>
            : ''}
      </div>
    </div>

    <div styleName="subheadline">
      <div styleName="time">
        {goalScorer.time} sec
        </div>
      <div styleName="score">{`${goalScorer.score[0]} : ${goalScorer
          .score[1]}`}</div>
    </div>
  </div>
  );

export default ScoreTimelineGoalScorer;