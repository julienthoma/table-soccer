import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import PropertyChart, { PROPERTIES } from '../containers/PropertyChart';
import { playerShape, gameShape } from '../proptypes';
import {
  getChartDataByKeyAndInterval,
  combineChartData
} from '../services/charts';
import { PINK, BLUE} from '../components/Colors';

const Player = ({
  match, players, games, properties
}) => {
  const player = players.filter(p => p.id === match.params.id)[0];
  const tableColumnStyle = { padding: '3px', textAlign: 'left' };
  const firstColumnStyle = {
    padding: '3px',
    textAlign: 'left',
    color: 'rgb(158, 158, 158)',
    fontSize: 12
  };
  const defaultGraphStyles = {
    legend: { display: false },
    title: { display: false },
    maintainAspectRatio: false
  };

  if (!player.placemnentFinished) {
    return (
      <div>
        <h2 className="headline">
          {player.name}
          {' '}
          {' '}
-
          {player.elo}
        </h2>
        <p>
          You need
          {' '}
          {10 - player.games}
          {' '}
          more games to get ranked.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-container">
      <h2 className="headline">
        {player.name}
        {' '}
        -
        {player.elo}
        <WinStreakIcon count={player.winStreak} />
      </h2>

      <div className="flex-item-large">
        <h3>MMR</h3>
        <div className="player__chart">
          <LineChart
            data={getChartDataByKeyAndInterval(games, player.id, 'elo', 'day')}
            options={defaultGraphStyles}
          />
        </div>
      </div>

      <div className="flex-item-large">
        <h3>Games</h3>
        <div className="player__chart">
          <LineChart
            data={combineChartData([
              getChartDataByKeyAndInterval(games, player.id, 'wins', 'day', {
                label: 'Wins',
                borderColor: BLUE,
                backgroundColor: 'transparent',
                pointRadius: 0
              }),
              getChartDataByKeyAndInterval(games, player.id, 'losses', 'day', {
                label: 'Losses',
                borderColor: PINK,
                backgroundColor: 'transparent',
                pointRadius: 0
              })
            ])}
            options={{
              legend: { display: true },
              title: { display: false },
              maintainAspectRatio: false
            }}
          />
        </div>
      </div>

      <div className="flex-item-small">
        <h3>⚔️ Attack vs 🛡 Defense</h3>

        <CompareBar
          leftHeadline="Attack Win %"
          rightHeadline="Defense Win %"
          leftText={getFormattedPercent(player.winRatioAttack)}
          rightText={getFormattedPercent(player.winRatioDefense)}
          leftValue={player.winRatioAttack}
          rightValue={player.winRatioDefense}
        />

        <CompareBar
          leftHeadline="Games Attack"
          rightHeadline="Games Defense"
          leftValue={player.gamesAttack}
          rightValue={player.gamesDefense}
        />

        <CompareBar
          leftHeadline="Goals Attack"
          rightHeadline="Goals Defense"
          leftValue={player.goalsAttack}
          rightValue={player.goalsDefense}
        />

        <CompareBar
          leftHeadline="Goals Striker"
          rightHeadline="Goals Midfield"
          leftValue={player.goalsPosStriker}
          rightValue={player.goalsPosMidfield}
        />

        <CompareBar
          leftHeadline="Goals Defense"
          rightHeadline="Goals Keeper"
          leftValue={player.goalsPosDefense}
          rightValue={player.goalsPosKeeper}
        />
      </div>

      <div className="flex-item-small">
        <h3>Performance Comparision</h3>
        <div>
          {PROPERTIES.map(({ key, label, inverse }, i) => (
            <SkillBar
              key={i}
              headline={label}
              value={player[key].toFixed(2)}
              property={properties[key]}
              inverse={inverse}
            />
          ))}
        </div>
      </div>

      <div className="flex-item-small">
        <h3>Skill Overview</h3>
        <PropertyChart players={[player]} showLabel={false} />
      </div>

      <div className="flex-item-small">
        <h3>More Stats</h3>
        <Table allRowsSelected={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={tableColumnStyle} />
              <TableHeaderColumn style={tableColumnStyle}>
                Total
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                ⚔️ Attack
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                🛡 Defense
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn style={firstColumnStyle}>Goals</TableRowColumn>
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
              <TableRowColumn style={firstColumnStyle}>Games</TableRowColumn>
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
              <TableRowColumn style={firstColumnStyle}>Wins</TableRowColumn>
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
              <TableRowColumn style={firstColumnStyle}>Losses</TableRowColumn>
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
                Own Goals
              </TableRowColumn>
              <TableRowColumn style={tableColumnStyle}>
                {player.ownGoals}
              </TableRowColumn>
              <TableRowColumn style={tableColumnStyle}>
                {player.ownGoalsAttack}
              </TableRowColumn>
              <TableRowColumn style={tableColumnStyle}>
                {player.ownGoalsDefense}
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

Player.propTypes = {
  match: PropTypes.object.isRequired,
  players: PropTypes.arrayOf(playerShape).isRequired,
  games: PropTypes.arrayOf(gameShape).isRequired,
  properties: PropTypes.shape({}).isRequired
};

const mapStateToProps = ({ app }) => ({
  games: app.games,
  players: app.players,
  properties: app.properties
});

export default connect(mapStateToProps)(Player);
