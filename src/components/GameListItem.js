import React from 'react';
import { FormattedDate } from 'react-intl';
import { getWinnerLoserPlayersByGame, getScoreByGame, getPlayerById } from '../helper';
import WinStreakIcon from './WinStreakIcon';

const GameListItem = ({game, handleClick}) => {
  const [winnerScore, loserScore] = getScoreByGame(game);

  const [winnerRearPlayerRaw, winnerFrontPlayerRaw, loserFrontPlayerRaw, loserRearPlayerRaw] =
    getWinnerLoserPlayersByGame(game);

  const winnerFrontPlayer = getPlayerById(winnerFrontPlayerRaw.id);
  const winnerRearPlayer = getPlayerById(winnerRearPlayerRaw.id);
  const loserFrontPlayer = getPlayerById(loserFrontPlayerRaw.id);
  const loserRearPlayer = getPlayerById(loserRearPlayerRaw.id);

  const winnerGainStyle = {color: '#AED581'};
  const loserGainStyle = {color: '#E57373'};


  return (
    <div className="game-list-item" onClick={handleClick(game)}>
        <div className="game-list-item__date">
          <FormattedDate
            value={game.startdate}
            month='long'
            day='2-digit'
            hour='numeric'
            minute='numeric'
          />,&nbsp;
          ({game.getDurationInMinutes()}min)
      </div>
      <div className="game-list-item__bottom">
        <div className="game-list-item__left">
          <div className="game-list-item__player">
            <div className="game-list-item__player-name">
              <div>{winnerFrontPlayer.name}</div>
              { game.isPlayerHot(winnerFrontPlayer.id)}
              <WinStreakIcon count={game.elo.winStreak[winnerFrontPlayer.id]}/>
            </div>
            <div className="game-list-item__player-score">
              { game.elo.total[winnerFrontPlayer.id] }&nbsp;
              <span style={winnerGainStyle} className="game-list-item__player-score-gain">(+{ game.elo.gain[winnerFrontPlayer.id] })</span>
            </div>
          </div>
          <div className="game-list-item__player">
            <div className="game-list-item__player-name">
              <div>{winnerRearPlayer.name}</div>
              {game.isPlayerHot(winnerRearPlayer.id)}
              <WinStreakIcon count={game.elo.winStreak[winnerRearPlayer.id]}/>
              </div>
            <div className="game-list-item__player-score">
              { game.elo.total[winnerRearPlayer.id] }&nbsp;
              <span style={winnerGainStyle} className="game-list-item__player-score-gain">(+{ game.elo.gain[winnerRearPlayer.id] })</span>
            </div>
          </div>
        </div>
        <div className="game-list-item__score">
          {winnerScore} : {loserScore}
        </div>
        <div className="game-list-item__right">
          <div className="game-list-item__player">
            <div className="game-list-item__player-name">
              <div>{loserFrontPlayer.name}</div>
              { game.isPlayerHot(loserFrontPlayer.id)}
              <WinStreakIcon count={game.elo.winStreak[loserFrontPlayer.id]}/>
              </div>
            <div className="game-list-item__player-score">
              { game.elo.total[loserFrontPlayer.id] }&nbsp;
              <span style={loserGainStyle} className="game-list-item__player-score-gain">({ game.elo.gain[loserFrontPlayer.id] })</span>
            </div>
          </div>
          <div className="game-list-item__player">
            <div className="game-list-item__player-name">
              <div>{loserRearPlayer.name}</div>
              { game.isPlayerHot(loserRearPlayer.id)}
              <WinStreakIcon count={game.elo.winStreak[loserRearPlayer.id]}/>
            </div>
            <div className="game-list-item__player-score">
              { game.elo.total[loserRearPlayer.id] }&nbsp;
              <span style={loserGainStyle} className="game-list-item__player-score-gain">({ game.elo.gain[loserRearPlayer.id] })</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameListItem;
