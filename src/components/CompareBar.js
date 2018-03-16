import React from 'react';
import PropTypes from 'prop-types';
import './CompareBar.scss';

const CompareBar = ({
  leftHeadline,
  rightHeadline,
  factorLeft,
  leftValue,
  rightValue
}) => (
  <div styleName="root">
    <div styleName="headlineContainer">
      <h4 styleName="leftHeadline">{leftHeadline}</h4>
      <h4 styleName="rightHeadline">{rightHeadline}</h4>
    </div>

    <div styleName="bar">
      <div styleName="left" style={{ flexGrow: factorLeft }} />
      <div styleName="leftText">{leftValue}</div>
      <div styleName="right" />
      <div styleName="rightText">{rightValue}</div>
    </div>
  </div>
);

CompareBar.propTypes = {
  leftHeadline: PropTypes.string.isRequired,
  rightHeadline: PropTypes.string.isRequired,
  factorLeft: PropTypes.number.isRequired,
  leftValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  rightValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};

export default CompareBar;
