import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

/**
 *
 * @param {PlayerEntity} player
 * @param handleClick
 * @constructor
 */
const PlayerListItem = ({ player, handleClick }) => {
  const tableColumnStyle = { padding: '3px', textAlign: 'center' };
  return (
    <TableRow onClick={handleClick}>
      <TableRowColumn style={tableColumnStyle}>
        {player.id}
      </TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>
        {player.games}
      </TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>
        {player.getWinPercent()}
      </TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>
        {player.elo}
      </TableRowColumn>
    </TableRow>
  );
};

export default PlayerListItem;
