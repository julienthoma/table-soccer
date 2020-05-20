import React from 'react';
import PropTypes from 'prop-types';
import PositionIcon from './PositionIcon';

const PlayerButton = ({
  name,
  team,
  upperCount,
  lowerCount,
  disabled,
  handleUpperClick,
  handleLowerClick,
  className
}) => (
  <div className={`player-button_root ${className} ${team} ${disabled ? 'disabled' : ''}`}>
    <div className="player-button__heightHack" />
    <span className="player-button__upperText">
      <PositionIcon count={upperCount} />
    </span>
    <div className="player-button__upperClick" onClick={handleUpperClick} />
    <div className="player-button__upperColor" />
    <span className="player-button__text">{name}</span>

    <span className="player-button__lowerText">
      <PositionIcon count={lowerCount} />
    </span>
    <div className="player-button__lowerClick" onClick={handleLowerClick} />
    <div className="player-button__lowerColor" />
  </div>
);

PlayerButton.defaultProps = {
  className: ''
};

PlayerButton.propTypes = {
  name: PropTypes.string.isRequired,
  team: PropTypes.oneOf(['team1', 'team2']).isRequired,
  upperCount: PropTypes.number.isRequired,
  lowerCount: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleUpperClick: PropTypes.func.isRequired,
  handleLowerClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default PlayerButton;
