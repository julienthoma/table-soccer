import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { playerShape } from '../proptypes';

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

PlayerListItem.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  player: playerShape.isRequired
};

export default PlayerListItem;
