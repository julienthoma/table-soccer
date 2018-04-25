import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import WinStreakIcon from './WinStreakIcon';
import { gameShape } from '../proptypes';
import './GameListItem.scss';

/**
 * @param {GameEntity} game
 * @param handleClick
 */
const GameListItem = ({
  headerText,
  playerLeftTopName,
  playerLeftBottomName,
  playerRightTopName,
  playerRightBottomName,
  handleClick
}) => {
  const winnerAttack = game.players[game.winnerAttack.id];
  const winnerDefense = game.players[game.winnerDefense.id];
  const loserAttack = game.players[game.loserAttack.id];
  const loserDefense = game.players[game.loserDefense.id];

  return (
    <div styleName="root" onClick={handleClick}>
      <div styleName="header-text">{headerText}</div>
      <div styleName="bottom">
        <div styleName="left">
          <div styleName="player">
            <div styleName="playerName">
              <div>{playerLeftTopName}</div>
              <WinStreakIcon count={winnerAttack.winStreak} />
            </div>
            <div styleName="playerScore">
              {winnerAttack.elo}&nbsp;
              <span styleName="gainColor">(+{winnerAttack.eloGain})</span>
            </div>
          </div>
          <div styleName="player">
            <div styleName="playerName">
              <div>{playerLeftBottomName}</div>
              <WinStreakIcon count={winnerDefense.winStreak} />
            </div>
            <div styleName="playerScore">
              {winnerDefense.elo}&nbsp;
              <span styleName="gainColor">(+{winnerDefense.eloGain})</span>
            </div>
          </div>
        </div>
        <div styleName="score">
          {game.winnerScore} : {game.loserScore}
        </div>
        <div styleName="right">
          <div styleName="player">
            <div styleName="playerName">
              <div>{playerRightTopName}</div>
            </div>
            <div styleName="playerScore">
              {loserAttack.elo}&nbsp;
              <span styleName="lostColor">({loserAttack.eloGain})</span>
            </div>
          </div>
          <div styleName="player">
            <div styleName="playerName">
              <div>{playerRightBottomName}</div>
            </div>
            <div styleName="playerScore">
              {loserDefense.elo}&nbsp;
              <span styleName="lostColor">({loserDefense.eloGain})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GameListItem.defaultProps = {
  handleClick: () => () => false
};

GameListItem.propTypes = {
  game: gameShape.isRequired,
  handleClick: PropTypes.func
};

export default GameListItem;
