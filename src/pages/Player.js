import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table';
import WinStreakIcon from '../components/WinStreakIcon';
import { playerShape } from '../proptypes';

const Player = ({ params, players }) => {
  const player = players.filter(p => p.id === params.id)[0];
  const tableColumnStyle = { padding: '3px', textAlign: 'left' };
  const firstColumnStyle = { padding: '3px', textAlign: 'left', color: 'rgb(158, 158, 158)', fontSize: 12 };

  return (<div className="headline">
    <h1 className="headline">{player.name} - {player.elo }<WinStreakIcon count={player.winStreak} /></h1>
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
            Goals
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.goals}
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.goalsAttack}
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.goalsDefense}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn style={firstColumnStyle}>
            Games
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.games}
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.gamesAttack}
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.gamesDefense}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn style={firstColumnStyle}>
            Wins
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.wins}
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.winsAttack}
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.winsDefense}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn style={firstColumnStyle}>
            Losses
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.losses}
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.lossesAttack}
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.lossesDefense}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn style={firstColumnStyle}>
            Playtime
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.getPlayTime()}
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.getPlayTimeAttack()}
          </TableRowColumn>
          <TableRowColumn style={tableColumnStyle}>
            {player.getPlayTimeDefense()}
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>);
};

Player.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string
  }).isRequired,
  players: React.PropTypes.arrayOf(React.PropTypes.shape(playerShape)).isRequired
};

const mapStateToProps = state => ({
  games: state.app.games,
  players: state.app.players
});

const _Player = connect(mapStateToProps)(Player);

export default _Player;
