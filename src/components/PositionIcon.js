import React from 'react';
import PropTypes from 'prop-types';
import PlayerIcon from './PlayerIcon';
import './PositionIcon.scss';

const PositionIcon = ({ count, dark }) => (
  <div styleName="root">
    {[...Array(count)].map((e, i) => <PlayerIcon key={i} dark={dark} />)}
  </div>
);

PositionIcon.defaultProps = {
  dark: false
};

PositionIcon.propTypes = {
  count: PropTypes.number.isRequired,
  dark: PropTypes.bool
};

export default PositionIcon;
