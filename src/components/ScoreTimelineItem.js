import React from 'react';
import PropTypes from 'prop-types';
import './ScoreTimelineItem.scss';
import PositionIcon from './PositionIcon';
import ScoreTimelineSubheadline from './ScoreTimelineSubheadline';
import { POSITION_COUNT } from '../constants';
import { scoreTimelineItemShape } from '../proptypes';
import { Flex, Box } from '.';

const Scorer = ({ name, position, isOwnGoal }) => (
  <div>
    {position === 'KEEPER' || position === 'DEFENSE' ? (
      <span>🛡</span>
    ) : (
      <span>⚔️</span>
    )}
    &nbsp;
    {name}
    {isOwnGoal ? (
      <div styleName="owngoal">🐓🐓🐓OWN GOAL🐓🐓🐓</div>
    ) : (
      <PositionIcon dark count={POSITION_COUNT[position]} />
    )}
  </div>
);

const ScoreTimelineItem = ({ goalScorer, isWinner }) => (
  <Box>
    <Flex justifyContent="space-between" height={55}>
      <Box width={1 / 2}>
        {isWinner ? (
          <Scorer
            name={goalScorer.name}
            position={goalScorer.position}
            isOwnGoal={goalScorer.ownGoal}
          />
        ) : (
          ''
        )}
      </Box>
      <Box width={1 / 2}>
        {!isWinner ? (
          <Scorer
            name={goalScorer.name}
            position={goalScorer.position}
            isOwnGoal={goalScorer.ownGoal}
          />
        ) : (
          ''
        )}
      </Box>
    </Flex>

    <ScoreTimelineSubheadline
      date={goalScorer.time}
      winnerScore={goalScorer.score[0]}
      loserScore={goalScorer.score[1]}
    />
  </Box>
);

ScoreTimelineItem.propTypes = {
  goalScorer: scoreTimelineItemShape.isRequired,
  isWinner: PropTypes.bool.isRequired
};

export default ScoreTimelineItem;
