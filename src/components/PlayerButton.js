import React from 'react';
import PropTypes from 'prop-types';
import PositionIcon from './PositionIcon';
import './PlayerButton.scss';

const PlayerButton = ({
  name,
  team,
  upperCount,
  lowerCount,
  disabled,
  handleUpperClick,
  handleLowerClick
}) =>
  <div styleName={`root ${team} ${disabled ? 'disabled' : ''}`}>
    <div styleName="heightHack" />
    <span styleName="upperText">
      <PositionIcon count={upperCount} />
    </span>
    <div styleName="upperClick" onClick={handleUpperClick} />
    <div styleName="upperColor" />
    <span styleName="text">
      {name}
    </span>

    <span styleName="lowerText">
      <PositionIcon count={lowerCount} />
    </span>
    <div styleName="lowerClick" onClick={handleLowerClick} />
    <div styleName="lowerColor" />
  </div>;

PlayerButton.propTypes = {
  name: PropTypes.string.isRequired,
  team: PropTypes.oneOf(['team1', 'team2']).isRequired,
  upperCount: PropTypes.number.isRequired,
  lowerCount: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleUpperClick: PropTypes.func.isRequired,
  handleLowerClick: PropTypes.func.isRequired
};

export default PlayerButton;
