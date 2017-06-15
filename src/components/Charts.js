import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

class BaseChart extends React.Component {
  componentDidMount() {
    this.chart = new Chart(findDOMNode(this), {
      type: this.props.type,
      data: this.props.data,
      options: this.props.options
    });
  }

  render() {
    return <canvas id={this.props.id} />;
  }
}

const defaultProps = {
  options: {}
};

const basePropTypes = {
  options: PropTypes.object,
  data: PropTypes.object.isRequired
};

BaseChart.propTypes = {
  ...basePropTypes,
  type: PropTypes.oneOf([
    'line',
    'bar',
    'radar',
    'polarArea',
    'pie',
    'doughnut',
    'bubble'
  ]).isRequired
};

BaseChart.defaultProps = {
  options: {}
};

const _BarChart = ({ options, data }) =>
  <BaseChart type="bar" data={data} options={options} />;

const _LineChart = ({ options, data }) =>
  <BaseChart type="line" data={data} options={options} />;

const _RadarChart = ({ options, data }) =>
  <BaseChart type="radar" data={data} options={options} />;

const _PolarArea = ({ options, data }) =>
  <BaseChart type="polarArea" data={data} options={options} />;

const _PieChart = ({ options, data }) =>
  <BaseChart type="pie" data={data} options={options} />;

const _Doughnut = ({ options, data }) =>
  <BaseChart type="doughnut" data={data} options={options} />;

const _BubbleChart = ({ options, data }) =>
  <BaseChart type="bubble" data={data} options={options} />;

_LineChart.propTypes = basePropTypes;
_BarChart.propTypes = basePropTypes;
_RadarChart.propTypes = basePropTypes;
_PolarArea.propTypes = basePropTypes;
_PieChart.propTypes = basePropTypes;
_Doughnut.propTypes = basePropTypes;
_BubbleChart.propTypes = basePropTypes;

_LineChart.defaultProps = defaultProps;
_BarChart.defaultProps = defaultProps;
_RadarChart.defaultProps = defaultProps;
_PolarArea.defaultProps = defaultProps;
_PieChart.defaultProps = defaultProps;
_Doughnut.defaultProps = defaultProps;
_BubbleChart.defaultProps = defaultProps;

export const BarChart = _BarChart;
export const LineChart = _LineChart;
export const RadarChart = _RadarChart;
export const PolarArea = _PolarArea;
export const PieChart = _PieChart;
export const Doughnut = _Doughnut;
export const BubbleChart = _BubbleChart;
