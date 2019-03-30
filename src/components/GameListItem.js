import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import styled from '@emotion/styled';
import WinStreakIcon from './WinStreakIcon';
import { gameShape } from '../proptypes';
import './GameListItem.scss';

const Container = styled.div`
  color: #6d6d6d;
  box-sizing: border-box;
  width: 100%;
  padding: 5px 0;

  &:nth-last-of-type(even) {
    background: #f3f3f3;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Date = styled.div`
  text-align: right;
  color: #bdbdbd;
  padding: 0 5px;
  font-style: italic;
`;

const GameListItem = ({ game, handleClick }) => {
  const winnerAttack = game.players[game.winnerAttack.id];
  const winnerDefense = game.players[game.winnerDefense.id];
  const loserAttack = game.players[game.loserAttack.id];
  const loserDefense = game.players[game.loserDefense.id];

  return (
    <Container onClick={handleClick(game)}>
      <Date>
        <FormattedDate
          value={game.startdate}
          month="long"
          day="2-digit"
          hour="numeric"
          minute="numeric"
        />
        ,&nbsp; ({Math.round(game.duration / 60)}min)
      </Date>
      <div styleName="bottom">
        <div styleName="left">
          <div styleName="player">
            <div styleName="playerName">
              <div>⚔️ {winnerAttack.name}</div>
              <WinStreakIcon count={winnerAttack.winStreak} />
            </div>
            <div styleName="playerScore">
              {winnerAttack.elo}&nbsp;
              <span styleName="gainColor">(+{winnerAttack.eloGain})</span>
            </div>
          </div>
          <div styleName="player">
            <div styleName="playerName">
              <div>🛡 {winnerDefense.name}</div>
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
              <div>⚔️ {loserAttack.name}</div>
            </div>
            <div styleName="playerScore">
              {loserAttack.elo}&nbsp;
              <span styleName="lostColor">({loserAttack.eloGain})</span>
            </div>
          </div>
          <div styleName="player">
            <div styleName="playerName">
              <div>🛡 {loserDefense.name}</div>
            </div>
            <div styleName="playerScore">
              {loserDefense.elo}&nbsp;
              <span styleName="lostColor">({loserDefense.eloGain})</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
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
