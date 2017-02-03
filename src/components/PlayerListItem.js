import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router'


const PlayerListItem = ({player, handleClick}) => {
  const tableColumnStyle = {padding: '3px', textAlign: 'center'};

  const lossCount = player.losses.length;
  const winCount = player.wins.length;
  const gameCount = lossCount + winCount;
  const winPercentage = Math.round(winCount / gameCount * 100);

  return (
      <TableRow
        onClick={handleClick ? handleClick(player) : ''}
      >
        <TableRowColumn style={tableColumnStyle}>
          {player.name}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
        {gameCount}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          {winCount}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          {player.winsFront.length}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          {player.winsRear.length}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          {lossCount}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          {winPercentage ? winPercentage + '%' : '-'}
        </TableRowColumn>
      </TableRow>
  );
};

export default PlayerListItem;
