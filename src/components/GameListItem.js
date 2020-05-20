import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import WinStreakIcon from './WinStreakIcon';
import { gameShape } from '../proptypes';

/**
 * @param {GameEntity} game
 * @param handleClick
 */
const GameListItem = ({ game, handleClick }) => {
  const winnerAttack = game.players[game.winnerAttack.id];
  const winnerDefense = game.players[game.winnerDefense.id];
  const loserAttack = game.players[game.loserAttack.id];
  const loserDefense = game.players[game.loserDefense.id];

  return (
    <div className="game-list-item__root" onClick={handleClick(game)}>
      <div className="game-list-item__date">
        <FormattedDate
          value={game.startdate}
          month="long"
          day="2-digit"
          hour="numeric"
          minute="numeric"
        />,&nbsp;
        ({Math.round(game.duration / 60)}min)
      </div>
      <div className="game-list-item__bottom">
        <div className="game-list-item__left">
          <div className="game-list-item__player">
            <div className="game-list-item__playerName">
              <div>⚔️ {winnerAttack.name}</div>
              <WinStreakIcon count={winnerAttack.winStreak} />
            </div>
            <div className="game-list-item__playerScore">
              { winnerAttack.elo }&nbsp;
              <span className="game-list-item__gainColor">
                (+{ winnerAttack.eloGain })
              </span>
            </div>
          </div>
          <div className="game-list-item__player">
            <div className="game-list-item__playerName">
              <div>🛡 {winnerDefense.name}</div>
              <WinStreakIcon count={winnerDefense.winStreak} />
            </div>
            <div className="game-list-item__playerScore">
              { winnerDefense.elo }&nbsp;
              <span className="game-list-item__gainColor">
                (+{ winnerDefense.eloGain })
              </span>
            </div>
          </div>
        </div>
        <div className="game-list-item__score">
          {game.winnerScore} : {game.loserScore}
        </div>
        <div className="game-list-item__right">
          <div className="game-list-item__player">
            <div className="game-list-item__playerName">
              <div>⚔️ {loserAttack.name}</div>
            </div>
            <div className="game-list-item__playerScore">
              { loserAttack.elo }&nbsp;
              <span className="game-list-item__lostColor">
                ({ loserAttack.eloGain })
              </span>
            </div>
          </div>
          <div className="game-list-item__player">
            <div className="game-list-item__playerName">
              <div>🛡 {loserDefense.name}</div>
            </div>
            <div className="game-list-item__playerScore">
              { loserDefense.elo }&nbsp;
              <span className="game-list-item__lostColor">
                ({ loserDefense.eloGain })
              </span>
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
