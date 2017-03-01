import React from 'react';
import Hot from 'material-ui/svg-icons/social/whatshot';

const WinStreakIcon = ({ count }) => {
  if (count < 3) {
    return false;
  }

  return (
    <div className="winstreak-icon">
      <Hot color={getColorByCount(count)} />
      <div className="hotnumber">{count}</div>
    </div>
  );
};

function getColorByCount(count) {
  if (count >= 10) {
    return '#9C27B0'
  }

  if (count >= 7) {
    return '#E91E63'
  }

  if (count >= 5) {
    return '#B71C1C';
  }

  if (count >= 3) {
    return '#F57C00';
  }
}

export default WinStreakIcon;
