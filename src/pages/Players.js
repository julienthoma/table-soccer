import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerListItem from '../components/PlayerListItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import { REAR_PLAYER, FRONT_PLAYER } from '../constants';
import { browserHistory } from 'react-router'

class Players extends Component {
  handleRowClick = player => () => {
    browserHistory.push('/player/' + player.id);
  };

  render() {
    const {games, players} = this.props;
    const tableColumnStyle = {padding: '3px', textAlign: 'center'};

    if (!games || !players || games.length === 0 || players.length === 0) {
      return false;
    }

    const playerWithGames = players.map(player => {
      const wins = games.filter(game => game.winners.filter(winner => player.id === winner.id).length > 0);
      const losses = games.filter(game => game.losers.filter(loser => player.id === loser.id).length > 0);

      return Object.assign({}, player, {wins, losses});
    }).sort((player1, player2) => player1.wins.length < player2.wins.length);

    return <Table allRowsSelected={false}>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={tableColumnStyle}>Name</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Games</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Wins</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Losses</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Win %</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playerWithGames.map((player, index) =>
            <PlayerListItem key={index} player={player} handleClick={this.handleRowClick(player)}/>
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
