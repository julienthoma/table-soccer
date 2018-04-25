import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import WinStreakIcon from './WinStreakIcon';
import { gameShape } from '../proptypes';
import GameListItem from './GameListItem';

const renderHeaderText = game => (
  <div>
    <FormattedDate
      value={game.startdate}
      month="long"
      day="2-digit"
      hour="numeric"
      minute="numeric"
    />,&nbsp; ({Math.round(game.duration / 60)}min)
  </div>
);

/**
 * @param {GameEntity} game
 * @param handleClick
 */
const CompletedGameListItem = ({ game, handleClick }) => {
  const winnerAttack = game.players[game.winnerAttack.id];
  const winnerDefense = game.players[game.winnerDefense.id];
  const loserAttack = game.players[game.loserAttack.id];
  const loserDefense = game.players[game.loserDefense.id];

  return (
    <GameListItem
      headerText={renderHeaderText(game)}
      handleClick={handleClick(game)}
      playerLeftTopName={winnerAttack.name}
      playerLeftBottomName={winnerDefense.name}
      playerRightTopName={loserAttack.name}
      playerRightBottomName={loserDefense.name}
    />
  );
};

CompletedGameListItem.defaultProps = {
  handleClick: () => () => false
};

CompletedGameListItem.propTypes = {
  game: gameShape.isRequired,
  handleClick: PropTypes.func
};

export default CompletedGameListItem;
