import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RadarChart } from '../components/Charts';
import { normalizeValue } from '../services/graphData';
import { playerShape } from '../proptypes';

const PropertyChart = ({ players, properties }) => {
  const blue = 'rgba(0, 188, 212,1)';
  const blueLight = 'rgba(0, 188, 212,0.2)';
  const pink = 'rgba(255, 64, 129,1)';
  const pinkLight = 'rgba(255, 64, 129,0.2)';
  const playerColors = [
    {
      backgroundColor: blueLight,
      borderColor: blue,
      pointBackgroundColor: blue,
      pointHoverBorderColor: blue
    },
    {
      backgroundColor: pinkLight,
      borderColor: pink,
      pointBackgroundColor: pink,
      pointHoverBorderColor: pink
    }
  ];

  const dataSets = players.map((player, index) => ({
    ...playerColors[index],
    label: player.name,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    data: [
      normalizeValue(player.winRatioAttack, properties.winRatioAttack),
      normalizeValue(
        player.avgGoalsWinnerAttack,
        properties.avgGoalsWinnerAttack
      ),
      normalizeValue(
        player.avgGoalsAgainstDefense,
        properties.avgGoalsAgainstDefense,
        true
      ),
      normalizeValue(player.winRatioDefense, properties.winRatioDefense),
      normalizeValue(
        player.avgLossDefenseDuration,
        properties.avgLossDefenseDuration
      ),
      normalizeValue(
        player.avgWinsAttackDuration,
        properties.avgWinsAttackDuration,
        true
      )
    ]
  }));

  const data = {
    labels: [
      'Attack Win Ratio',
      'Goals Attack',
      'Goals Against',
      'Defense Win Ratio',
      'Defense duration',
      'Fast Wins Attack'
    ],
    datasets: dataSets
  };

  return (
    <div className="property-chart">
      <h3 className="property-chart__labels">Attack</h3>
      <RadarChart
        data={data}
        options={{
          scale: {
            ticks: {
              min: 0,
              max: 10,
              fixedStepSize: 1
            }
          }
        }}
      />
      <h3 className="property-chart__labels">Defense</h3>
    </div>
  );
};

PropertyChart.propTypes = {
  players: PropTypes.arrayOf(playerShape).isRequired,
  properties: PropTypes.objectOf(PropTypes.number).isRequired
};

const mapStateToProps = state => ({
  properties: state.app.properties
});

const _PropertyChart = connect(mapStateToProps)(PropertyChart);

export default _PropertyChart;
