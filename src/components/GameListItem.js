import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import { FormattedDate } from 'react-intl';
import { FRONT_PLAYER, REAR_PLAYER} from '../constants';
import { Link } from 'react-router'

const GameListItem = ({game, handleClick}) => {
  const date = new Date(game.startdate);
  const winnerScore = game.winners[0].score + game.winners[1].score;
  const loserScore = game.losers[0].score + game.losers[1].score;

  const [ winnerRearPlayer ] = game.winners.filter(player => player.position === REAR_PLAYER);
  const [ winnerFrontPlayer ] = game.winners.filter(player => player.position === FRONT_PLAYER);
  const [ loserFrontPlayer ] = game.losers.filter(player => player.position === FRONT_PLAYER);
  const [ loserRearPlayer ] = game.losers.filter(player => player.position === REAR_PLAYER);

  const tableColumnStyle = {padding: '3px', textAlign: 'center'};

  return (
      <TableRow
        onClick={handleClick ? handleClick(game) : ''}
      >
        <TableRowColumn style={tableColumnStyle}>
          <Avatar src={winnerRearPlayer.icon} />
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          <Avatar src={winnerFrontPlayer.icon} />
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>{winnerScore}</TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>{loserScore}</TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          <Avatar src={loserFrontPlayer.icon} />
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          <Avatar src={loserRearPlayer.icon} />
        </TableRowColumn>
      </TableRow>
  );
};

export default GameListItem;
