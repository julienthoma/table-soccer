import React from 'react';
import './SkillBar.scss';
import { getFormattedPercent } from '../services/Formatter';

const SkillBar = ({
  playerId,
  factor,
  leftHeadline,
  value,
  best,
  bestPlayerId
}) =>
  <div styleName="root">
    <div styleName="headlineContainer">
      <h4 styleName="leftHeadline">{leftHeadline}</h4>
      <h4 styleName="rightHeadline">Best</h4>
    </div>

    <div styleName="bar">
      <div styleName="left" style={{ width: getFormattedPercent(factor) }} />
      <div styleName="leftText">{value}</div>
      <div styleName="right" />
      <div styleName="rightText">
        {best} ({bestPlayerId})
      </div>
    </div>
  </div>;

export default SkillBar;
