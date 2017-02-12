import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import { getWinnerLoserPlayersByGame, getScoreByGame } from '../helper';

const GameListItem = ({game, handleClick}) => {
  const tableColumnStyle = {padding: '3px', textAlign: 'center'};
  const avatarStyle = {fontSize: 13, textTransform: 'uppercase'};
  const [winnerScore, loserScore] = getScoreByGame(game);

  const [winnerRearPlayer, winnerFrontPlayer, loserFrontPlayer, loserRearPlayer] =
    getWinnerLoserPlayersByGame(game);

  return (
      <TableRow
        onClick={handleClick ? handleClick(game) : ''}
      >
        <TableRowColumn style={tableColumnStyle}>
          <Avatar style={avatarStyle}>{winnerRearPlayer.id}</Avatar>
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          <Avatar style={avatarStyle}>{winnerFrontPlayer.id}</Avatar>
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>{winnerScore}</TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>{loserScore}</TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          <Avatar style={avatarStyle}>{loserFrontPlayer.id}</Avatar>
        </TableRowColumn>
        <TableRowColumn style={tableColumnStyle}>
          <Avatar style={avatarStyle}>{loserRearPlayer.id}</Avatar>
        </TableRowColumn>
      </TableRow>
  );
};

export default GameListItem;
