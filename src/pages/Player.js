import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PROPERTIES } from '../containers/PropertyChart';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn
} from 'material-ui/Table';
import { getFormattedPercent } from '../services/formatter';
import { LineChart } from '../components/Charts';
import CompareBar from '../components/CompareBar';
import SkillBar from '../components/SkillBar';
import WinStreakIcon from '../components/WinStreakIcon';
import PropertyChart from '../containers/PropertyChart';
import { playerShape, gameShape } from '../proptypes';
import { getMmmrOfWeeks, getFactor } from '../services/graphData';
import '../scss/typography.scss';

const Player = ({ params, players, games, properties }) => {
  const player = players.filter(p => p.id === params.id)[0];
  const tableColumnStyle = { padding: '3px', textAlign: 'left' };
  const firstColumnStyle = {
    padding: '3px',
    textAlign: 'left',
    color: 'rgb(158, 158, 158)',
    fontSize: 12
  };
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

  return (
    <div>
      <h1 styleName="headline">
        {player.name} - {player.elo}<WinStreakIcon count={player.winStreak} />
      </h1>
      <LineChart
        data={data}
        options={{
          legend: { display: false },
          title: { text: 'MMR', display: true }
        }}
      />
      <h3>Attack vs Defense</h3>

      <CompareBar
        leftHeadline="Attack Win %"
        rightHeadline="Defense Win %"
        factorLeft={player.winRatioAttack / player.winRatioDefense}
        leftValue={getFormattedPercent(player.winRatioAttack)}
        rightValue={getFormattedPercent(player.winRatioDefense)}
      />

      <CompareBar
        leftHeadline="Games Attack"
        rightHeadline="Games Defense"
        factorLeft={player.gamesAttack / player.gamesDefense}
        leftValue={player.gamesAttack}
        rightValue={player.gamesDefense}
      />

      <CompareBar
        leftHeadline="Goals Attack"
        rightHeadline="Goals Defense"
        factorLeft={player.goalsAttack / player.goalsDefense}
        leftValue={player.goalsAttack}
        rightValue={player.goalsDefense}
      />

      <CompareBar
        leftHeadline="Goals Striker"
        rightHeadline="Goals Midfield"
        factorLeft={player.goalsPosStriker / player.goalsPosMidfield}
        leftValue={player.goalsPosStriker}
        rightValue={player.goalsPosMidfield}
      />

      <CompareBar
        leftHeadline="Goals Defense"
        rightHeadline="Goals Keeper"
        factorLeft={player.goalsPosDefense / player.goalsPosKeeper}
        leftValue={player.goalsPosDefense}
        rightValue={player.goalsPosKeeper}
      />

      <h3>Performance Comparision</h3>

      <div>
        {PROPERTIES.map(({ key, label, inverse }) =>
          <SkillBar
            leftHeadline={label}
            value={player[key].toFixed(2)}
            best={
              inverse
                ? properties[key].min.value.toFixed(2)
                : properties[key].max.value.toFixed(2)
            }
            maxPlayerId={
              inverse ? properties[key].min.id : properties[key].max.id
            }
            playerId={player.id}
            factor={getFactor(
              player[key],
              properties[key].min.value,
              properties[key].max.value,
              inverse
            )}
          />
        )}
      </div>

      <PropertyChart players={[player]} />
      <Table allRowsSelected={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={tableColumnStyle} />
            <TableHeaderColumn style={tableColumnStyle}>
              Total
            </TableHeaderColumn>
            <TableHeaderColumn style={tableColumnStyle}>
              Attack
            </TableHeaderColumn>
            <TableHeaderColumn style={tableColumnStyle}>
              Defense
            </TableHeaderColumn>
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
    </div>
  );
};

Player.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  players: PropTypes.arrayOf(playerShape).isRequired,
  games: PropTypes.arrayOf(gameShape).isRequired
};

const mapStateToProps = state => ({
  games: state.app.games,
  players: state.app.players,
  properties: state.app.properties
});

const _Player = connect(mapStateToProps)(Player);

export default _Player;
