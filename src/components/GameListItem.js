import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import { FormattedDate } from 'react-intl';
import { FRONT_PLAYER, REAR_PLAYER} from '../constants';
import { Link } from 'react-router'

const GameListItem = ({game, players, handleClick}) => {
  const tableColumnStyle = {padding: '3px', textAlign: 'center'};
  const winnerScore = game.winners[0].score + game.winners[1].score;
  const loserScore = game.losers[0].score + game.losers[1].score;

  const [ winnerRearPlayer ] = game.winners.filter(player => player.position === REAR_PLAYER);
  const [ winnerFrontPlayer ] = game.winners.filter(player => player.position === FRONT_PLAYER);
  const [ loserFrontPlayer ] = game.losers.filter(player => player.position === FRONT_PLAYER);
  const [ loserRearPlayer ] = game.losers.filter(player => player.position === REAR_PLAYER);

  const [ winnerRearPlayerEntity ] = players.filter(player => player.id === winnerRearPlayer.playerId);
  const [ winnerFrontPlayerEntity ] = players.filter(player => player.id === winnerFrontPlayer.playerId);
  const [ loserFrontPlayerEntity ] = players.filter(player => player.id === loserFrontPlayer.playerId);
  const [ loserRearPlayerEntity ] = players.filter(player => player.id === loserRearPlayer.playerId);

  return (
      <TableRow
        onClick={handleClick ? handleClick(game) : ''}
      >
        <TableRowColumn style={tableColumnStyle}>
          <Avatar src={winnerRearPlayerEntity.icon} />
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          <Avatar src={winnerFrontPlayerEntity.icon} />
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>{winnerScore}</TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>{loserScore}</TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          <Avatar src={loserFrontPlayerEntity.icon} />
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          <Avatar src={loserRearPlayerEntity.icon} />
        </TableRowColumn>
      </TableRow>
  );
};

export default GameListItem;
