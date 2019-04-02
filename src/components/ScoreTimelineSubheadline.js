import React from 'react';
import { FormattedDate } from 'react-intl';
import { Text } from '.';

const ScoreTimelineSubheadline = ({ date, winnerScore, loserScore }) => (
  <Text my={1} textAlign="center" color="grey.1">
    <Text lineHeight={1} fontSize={0}>
      <FormattedDate value={date} hour="2-digit" minute="2-digit" />
    </Text>
    <Text lineHeight={3} fontSize={6}>
      {winnerScore} : {loserScore}
    </Text>
  </Text>
);

export default ScoreTimelineSubheadline;
