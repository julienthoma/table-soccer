import React from 'react';
import PropTypes from 'prop-types';
import './SkillBar.scss';
import { getFormattedPercent } from '../services/formatter';

const SkillBar = ({
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

SkillBar.propTypes = {
  factor: PropTypes.number.isRequired,
  leftHeadline: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  best: PropTypes.string.isRequired,
  bestPlayerId: PropTypes.string.isRequired
};

export default SkillBar;
