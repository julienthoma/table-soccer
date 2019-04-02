import React from 'react';
import { FormattedDate } from 'react-intl';
import { gameShape } from '../proptypes';
import ScoreTimelineItem from './ScoreTimelineItem';
import { Text, Box } from '.';

const ScoreTimeline = ({ game }) => (
  <Box mt={3}>
    <Text my={1} textAlign="center" color="grey.1">
      <Text lineHeight={1} fontSize={0}>
        <FormattedDate value={game.startdate} hour="2-digit" minute="2-digit" />
      </Text>
      <Text lineHeight={3} fontSize={6}>0 : 0</Text>
    </Text>
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
