import React from 'react';
import { FormattedDate } from 'react-intl';
import GameListItem from '../components/GameListItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

const GameList = ({ games, handleRowClick }) => {
  const tableColumnStyle = {padding: '3px', textAlign: 'center'};

  return (
    <Table allRowsSelected={false}>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={tableColumnStyle}>Rear</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Front</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Winner</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Loser</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Front</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Rear</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game, index) =>
          <GameListItem key={index} game={game} handleClick={handleRowClick} />
        )}
      </TableBody>
    </Table>
  );
};

export default GameList;
