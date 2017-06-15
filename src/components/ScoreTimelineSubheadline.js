import React from 'react';
import { FormattedDate } from 'react-intl';

const ScoreTimelineSubheadline = ({ time, score }) =>
  <div className="scoretimeline__subheadline">
    <div className="scoretimeline__time">
      <FormattedDate
        value={time}
        hour="numeric"
        minute="numeric"
        second="numeric"
      />
    </div>
    <div className="scoretimeline__score">{`${score[0]} : ${score[1]}`}</div>
  </div>;

export default ScoreTimelineSubheadline;
