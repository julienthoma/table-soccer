import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';

const PlayerListItem = ({player, handleClick}) => {
  const tableColumnStyle = {padding: '3px', textAlign: 'center'};
  return (
      <TableRow
        onClick={handleClick ? handleClick : ''}
      >
        <TableRowColumn style={tableColumnStyle}>
          {player.id}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          {player.games.count()}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          {player.games.getWinPercent()}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          {player.getElo()}
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          {player.games.getGpwByPlayer()}
        </TableRowColumn>
      </TableRow>
  );
};

export default PlayerListItem;
