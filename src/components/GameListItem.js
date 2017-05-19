import React from 'react';
import { FormattedDate } from 'react-intl';
import WinStreakIcon from './WinStreakIcon';
import { gameShape } from '../proptypes';

/**
 * @param {GameEntity} game
 * @param handleClick
 */
const GameListItem = ({ game, handleClick }) => {
  const winnerGainStyle = { color: '#AED581' };
  const loserGainStyle = { color: '#E57373' };
  const winnerAttack = game.players[game.winnerAttack.id];
  const winnerDefense = game.players[game.winnerDefense.id];
  const loserAttack = game.players[game.loserAttack.id];
  const loserDefense = game.players[game.loserDefense.id];

  return (
    <div className="game-list-item" onClick={handleClick(game)}>
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
            <div className="game-list-item__player-name">
              <div>{winnerAttack.name}</div>
              <WinStreakIcon count={winnerAttack.winStreak} />
            </div>
            <div className="game-list-item__player-score">
              { winnerAttack.elo }&nbsp;
              <span
                style={winnerGainStyle}
                className="game-list-item__player-score-gain"
              >
                (+{ winnerAttack.eloGain })
              </span>
            </div>
          </div>
          <div className="game-list-item__player">
            <div className="game-list-item__player-name">
              <div>{winnerDefense.name}</div>
              <WinStreakIcon count={winnerDefense.winStreak} />
            </div>
            <div className="game-list-item__player-score">
              { winnerDefense.elo }&nbsp;
              <span
                style={winnerGainStyle}
                className="game-list-item__player-score-gain"
              >
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
            <div className="game-list-item__player-name">
              <div>{loserAttack.name}</div>
            </div>
            <div className="game-list-item__player-score">
              { loserAttack.elo }&nbsp;
              <span
                style={loserGainStyle}
                className="game-list-item__player-score-gain"
              >
                ({ loserAttack.eloGain })
              </span>
            </div>
          </div>
          <div className="game-list-item__player">
            <div className="game-list-item__player-name">
              <div>{loserDefense.name}</div>
            </div>
            <div className="game-list-item__player-score">
              { loserDefense.elo }&nbsp;
              <span
                style={loserGainStyle}
                className="game-list-item__player-score-gain"
              >
                ({ loserDefense.eloGain })
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GameListItem.propTypes = {
  game: gameShape.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default GameListItem;
