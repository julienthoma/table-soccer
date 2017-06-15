import React from 'react';
import PropTypes from 'prop-types';
import Hot from 'material-ui/svg-icons/social/whatshot';
import './WinStreakIcon.scss';

const WinStreakIcon = ({ count }) => {
  if (count < 3) {
    return false;
  }

  return (
    <div styleName="root">
      <Hot styleName={`streak-${getClassNumberByCount(count)}`} />
      <div styleName="hotnumber">{count}</div>
    </div>
  );
};

function getClassNumberByCount(count) {
  if (count >= 10) {
    return 10;
  }

  if (count >= 7) {
    return 7;
  }

  if (count >= 5) {
    return 5;
  }

  if (count >= 3) {
    return 3;
  }
}

WinStreakIcon.propTypes = {
  count: PropTypes.number.isRequired
};

export default WinStreakIcon;
