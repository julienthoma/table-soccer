import React from 'react';
import './CompareBar.scss';

const CompareBar = ({
  leftHeadline,
  rightHeadline,
  factorLeft,
  leftValue,
  rightValue
}) =>
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
  </div>;

export default CompareBar;
