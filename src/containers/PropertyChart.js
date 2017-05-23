import React from 'react';
import { connect } from 'react-redux';
import { RadarChart } from '../components/Charts';
import { normalizeValue } from '../services/graphData';

class PropertyChart extends React.Component {
  render() {
    const { player, properties } = this.props;
    const data = {
      labels: [
        'Attack Win Ratio',
        'Goals Attack',
        'Goals Against',
        'Defense Win Ratio',
        'Defense duration',
        'Fast Wins Attack'
      ],
      datasets: [
        {
          label: player.name,
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [
            normalizeValue(player.winRatioAttack, properties.winRatioAttack),
            normalizeValue(player.avgGoalsWinnerAttack, properties.avgGoalsWinnerAttack),
            normalizeValue(player.avgGoalsAgainstDefense, properties.avgGoalsAgainstDefense, true),
            normalizeValue(player.winRatioDefense, properties.winRatioDefense),
            normalizeValue(player.avgLossDefenseDuration, properties.avgLossDefenseDuration),
            normalizeValue(player.avgWinsAttackDuration, properties.avgWinsAttackDuration, true)
          ]
        }
      ]
    };

    return (
      <div className="property-chart">
        <h3 className="property-chart__labels">Attack</h3>
        <RadarChart
          data={data}
          options={{
            legend: {
              display: false
            },
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
  }
}

PropertyChart.propTypes = {
};

const mapStateToProps = state => ({
  properties: state.app.properties
});

const _PropertyChart = connect(mapStateToProps)(PropertyChart);

export default _PropertyChart;
