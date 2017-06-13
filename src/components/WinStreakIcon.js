import React from 'react';
import Hot from 'material-ui/svg-icons/social/whatshot';
import './WinStreakIcon.scss';

const WinStreakIcon = ({ count }) => {
  if (count < 3) {
    return false;
  }

  return (
    <div styleName="root">
      <Hot color={getColorByCount(count)} />
      <div styleName="hotnumber">{count}</div>
    </div>
  );
};

function getColorByCount(count) {
  if (count >= 10) {
    return '#9C27B0';
  }

  if (count >= 7) {
    return '#E91E63';
  }

  if (count >= 5) {
    return '#B71C1C';
  }

  if (count >= 3) {
    return '#F57C00';
  }
}

WinStreakIcon.propTypes = {
  count: React.PropTypes.number.isRequired
};

export default WinStreakIcon;
