import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';

const PlayerListItem = ({player, handleClick}) => {
  const tableColumnStyle = {padding: '3px', textAlign: 'center'};

  const lossCount = player.losses.length;
  const winCount = player.wins.length;
  const gameCount = lossCount + winCount;
  const winPercentage = Math.round(winCount / gameCount * 100);

  return (
      <TableRow
        onClick={handleClick ? handleClick : ''}
      >
        <TableRowColumn style={tableColumnStyle}>
          {player.id}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
        {gameCount}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          {winCount}
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
