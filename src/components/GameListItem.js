import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import { FormattedDate } from 'react-intl';
import { FRONT_PLAYER, REAR_PLAYER} from '../constants';

const GameListItem = ({game}) => {
  const date = new Date(game.date);
  const winnerScore = game.winner.score;
  const loserScore = game.loser.score;
  const [ winnerRearPlayer ] = game.winner.players.filter(player => player.position === REAR_PLAYER);
  const [ winnerFrontPlayer ] = game.winner.players.filter(player => player.position === FRONT_PLAYER);
  const [ loserFrontPlayer ] = game.loser.players.filter(player => player.position === FRONT_PLAYER);
  const [ loserRearPlayer ] = game.loser.players.filter(player => player.position === REAR_PLAYER);

  winnerRearPlayer.image = 'https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00.jpg';
  winnerFrontPlayer.image = 'https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00.jpg';
  loserFrontPlayer.image = 'https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00.jpg';
  loserRearPlayer.image = 'https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00.jpg';


  const tableColumnStyle = {padding: '3px', textAlign: 'center'};

  return (
    <TableRow>
      <TableRowColumn style={tableColumnStyle}>
        <Avatar src={winnerRearPlayer.image} />
      </TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>
        <Avatar src={winnerFrontPlayer.image} />
      </TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>{winnerScore}</TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>{loserScore}</TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>
        <Avatar src={loserFrontPlayer.image} />
      </TableRowColumn>
      <TableRowColumn style={tableColumnStyle}>
        <Avatar src={loserFrontPlayer.image} />
      </TableRowColumn>
    </TableRow>
  );
};

export default GameListItem;
