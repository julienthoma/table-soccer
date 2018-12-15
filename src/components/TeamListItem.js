import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableRowColumn } from 'material-ui/Table';

const TeamListItem = ({ team, handleClick }) => {
  const tableColumnStyle = { padding: '3px', textAlign: 'center' };
  return (
    <TableRow onClick={handleClick}>
      <TableRowColumn style={tableColumnStyle}>
        {team.attack.name}
      </TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>
        {team.defense.name}
      </TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>
        {team.wins}
      </TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>
        {team.losses}
      </TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>
        {team.elo}
      </TableRowColumn>
    </TableRow>
  );
};

TeamListItem.propTypes = {
  handleClick: PropTypes.func
};

export default TeamListItem;
