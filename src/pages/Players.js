import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerListItem from '../components/PlayerListItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import { getPlayerById } from '../helper';
import { browserHistory } from 'react-router'
import Player from '../entities/Player';

class Players extends Component {
  handleRowClick = player => () => {
    browserHistory.push('/player/' + player.id);
  };

  render() {
    const {games, players} = this.props;
    const tableColumnStyle = {padding: '3px', textAlign: 'center'};

    const playerWithGames = players.map(player => getPlayerById(player.id)).sort((a, b) => {
      return b.elo - a.elo
    });

    return <Table allRowsSelected={false}>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={tableColumnStyle}>Name</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Games</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Wins%</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>MMR</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>GPG</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playerWithGames.map((_player, index) => {
          const player = getPlayerById(_player.id);

          return <PlayerListItem key={index} player={player} handleClick={this.handleRowClick(player)}/>
        }
        )}
      </TableBody>
    </Table>
  }
}

const mapStateToProps = state => ({
  games: state.games,
  players: state.players
});

const _Players = connect(mapStateToProps)(Players);

export default _Players;
