import React from 'react';
import './SkillBar.scss';
import { getFormattedPercent } from '../services/formatter';

const SkillBar = ({
  playerId,
  factor,
  leftHeadline,
  value,
  best,
  maxPlayerId
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
        {best} ({playerId})
      </div>
    </div>
  </div>;

export default SkillBar;
