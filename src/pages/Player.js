import React, { Component } from 'react';
import { connect } from 'react-redux';
import WinStreakIcon from '../components/WinStreakIcon';
import {Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn} from 'material-ui/Table';
import { getPlayerById, getGamesByPlayerId } from '../helper';
import { REAR_PLAYER, FRONT_PLAYER } from '../constants';
import { browserHistory } from 'react-router'
import GameList from '../components/GameList';

class Player extends Component {
  handleRowClick = game => () => {
    browserHistory.push('/game/' + game.id);
  }
  render() {
    const id = this.props.params.id;
    const player = getPlayerById(id);
    const tableColumnStyle = {padding: '3px', textAlign: 'left'};
    const firstColumnStyle = {padding: '3px', textAlign: 'left', color: 'rgb(158, 158, 158)', fontSize: 12};

    return <div className="headline">
      <h1 className="headline">{player.name} - {player.getElo() }<WinStreakIcon count={player.getWinStreak()}/></h1>
      <Table allRowsSelected={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={tableColumnStyle} />
            <TableHeaderColumn style={tableColumnStyle}>Total</TableHeaderColumn>
            <TableHeaderColumn style={tableColumnStyle}>Attack</TableHeaderColumn>
            <TableHeaderColumn style={tableColumnStyle}>Defense</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn style={firstColumnStyle}>
              Gpg
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.getGpgByPlayer()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPosition(FRONT_PLAYER).getGpgByPlayer()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPosition(REAR_PLAYER).getGpgByPlayer()}
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={firstColumnStyle}>
              Gpw
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.getGpwByPlayer()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPosition(FRONT_PLAYER).getGpwByPlayer()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPosition(REAR_PLAYER).getGpwByPlayer()}
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={firstColumnStyle}>
              Goals
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.getGoalsByPlayer()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPosition(FRONT_PLAYER).getGoalsByPlayer()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPosition(REAR_PLAYER).getGoalsByPlayer()}
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={firstColumnStyle}>
              Games
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.count()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPosition(FRONT_PLAYER).count()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPosition(REAR_PLAYER).count()}
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={firstColumnStyle}>
              Wins
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPlayerWins().count()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPlayerWins().filterByPosition(FRONT_PLAYER).count()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPlayerWins().filterByPosition(REAR_PLAYER).count()}
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={firstColumnStyle}>
              Losses
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPlayerLosses().count()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPlayerLosses().filterByPosition(FRONT_PLAYER).count()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPlayerLosses().filterByPosition(REAR_PLAYER).count()}
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={firstColumnStyle}>
              Playtime
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.getDurationString()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPosition(FRONT_PLAYER).getDurationString()}
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {player.games.filterByPosition(REAR_PLAYER).getDurationString()}
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
      <h2>Games</h2>
      <GameList games={getGamesByPlayerId(id)} handleRowClick={this.handleRowClick} />
    </div>
  }
}

const mapStateToProps = state => ({
  games: state.games,
  players: state.players
});

const _Player = connect(mapStateToProps)(Player);

export default _Player;
