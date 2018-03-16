import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RadarChart } from '../components/Charts';
import { normalizeValue } from '../services/helper';
import { playerShape } from '../proptypes';
import './PropertyChart.scss';

export const PROPERTIES = [
  {
    key: 'avgTimeBetweenGoals',
    label: 'Fast Goals',
    inverse: true
  },
  {
    key: 'avgGoalsPosMidfield',
    label: 'Goals Midfield'
  },
  {
    key: 'avgGoalsPosDefense',
    label: 'Goals Defense'
  },
  {
    key: 'avgTimeBetweenGoalsAgainst',
    label: 'Strong Defense'
  },
  {
    key: 'avgGoalsPosKeeper',
    label: 'Goals Keeper'
  },
  {
    key: 'avgGoalsPosStriker',
    label: 'Goals Striker'
  }
];

const PropertyChart = ({ players, properties, showLabel }) => {
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
    data: PROPERTIES.map(({ key, inverse }) =>
      normalizeValue(player[key], properties[key], inverse)
    )
  }));

  const data = {
    labels: PROPERTIES.map(({ label }) => label),
    datasets: dataSets
  };

  return (
    <div styleName="root">
      <div styleName="label-attack">Attack</div>
      <RadarChart
        data={data}
        options={{
          legend: { display: showLabel },
          scale: {
            ticks: {
              min: 0,
              max: 10,
              fixedStepSize: 1
            }
          }
        }}
      />
      <div styleName="label-defense">Defense</div>
    </div>
  );
};

PropertyChart.defaultProps = {
  showLabel: true
};

PropertyChart.propTypes = {
  players: PropTypes.arrayOf(playerShape).isRequired,
  properties: PropTypes.object.isRequired
};

const mapStateToProps = ({ app }) => ({
  properties: app.properties
});

export default connect(mapStateToProps)(PropertyChart);
