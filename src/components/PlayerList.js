import React from 'react';
import PlayerListItem from '../components/PlayerListItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import { REAR_PLAYER, FRONT_PLAYER } from '../constants';

const PlayerList = ({ games, players, handleRowClick }) => {
  const tableColumnStyle = {padding: '3px', textAlign: 'center'};

  if (!games || !players || games.length === 0 || players.lenght === 0) {
    return false;
  }


  const playerWithGames = players.map(player => {
    const wins = games.filter(game => game.winners.filter(winner => player.id === winner.playerId).length > 0);
    const losses = games.filter(game => game.losers.filter(loser => player.id === loser.playerId).length > 0);
    const winsRear = wins.filter(game => game.winners.filter(_player => _player.position === REAR_PLAYER && _player.playerId === player.id).length > 0);
    const winsFront = wins.filter(game => game.winners.filter(_player => _player.position === FRONT_PLAYER && _player.playerId === player.id).length > 0);

    return Object.assign({}, player, {wins, losses, winsFront, winsRear});
  }).sort((player1, player2) => player1.wins.length < player2.wins.length);



  return (
    <Table allRowsSelected={false}>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={tableColumnStyle}>Name</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Games</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Wins</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Wins Sturm</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Wins Abwehr</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Losses</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Win %</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          playerWithGames.map((player, index) => <PlayerListItem key={index} player={player} handleClick={handleRowClick} />
        )}
      </TableBody>
    </Table>
  );
};

export default PlayerList;
