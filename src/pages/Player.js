import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table';
import { LineChart } from '../components/Charts';
import WinStreakIcon from '../components/WinStreakIcon';
import PropertyChart from '../containers/PropertyChart';
import { playerShape } from '../proptypes';
import { getMmmrOfWeeks } from '../services/graphData';
import '../scss/typography.scss';

const Player = ({ params, players, games, properties }) => {
  const player = players.filter(p => p.id === params.id)[0];
  const tableColumnStyle = { padding: '3px', textAlign: 'left' };
  const firstColumnStyle = { padding: '3px', textAlign: 'left', color: 'rgb(158, 158, 158)', fontSize: 12 };
  const mmrData = getMmmrOfWeeks(games, player.id);
  const data = {
    labels: mmrData.labels,
    datasets: [
      {
        label: 'MMR Development',
        borderWidth: 3,
        data: mmrData.data
      }
    ]
  };

  return (<div>
    <h1 styleName="headline">{player.name} - {player.elo }<WinStreakIcon count={player.winStreak} /></h1>
    <LineChart data={data} options={{legend: { display: false }, title: { text: 'MMR', display: true}}} />
    <PropertyChart players={[player]} />
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
  params: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  players: PropTypes.arrayOf(playerShape).isRequired
};

const mapStateToProps = state => ({
  games: state.app.games,
  players: state.app.players
});

const _Player = connect(mapStateToProps)(Player);

export default _Player;
