import React from 'react';
import PropTypes from 'prop-types';
import PlayerIcon from './PlayerIcon';
import './PositionIcon.scss';

const PositionIcon = ({ count }) =>
  <div styleName="root">
    {[...Array(count)].map((e, i) => <PlayerIcon key={i} />)}
  </div>;

PositionIcon.propTypes = {
  count: PropTypes.number.isRequired
};

export default PositionIcon;
