import * as charts from './charts';
import { transform } from './transformer';
import dataMock from './__mocks__/rawData';

describe('Charts', () => {
  it('getChartDataByKeyAndInterval mmr day', () => {
    const transformedData = transform(dataMock);

    expect(
      charts.getChartDataByKeyAndInterval(
        transformedData.games,
        'jth',
        'elo',
        'day'
      )
    ).toEqual({ datasets: [{ data: [1434, 1417] }], labels: ['21.6', '23.6'] });
  });

  it('getChartDataByKeyAndInterval game day', () => {
    const transformedData = transform(dataMock);

    expect(
      charts.getChartDataByKeyAndInterval(
        transformedData.games,
        'jth',
        'games',
        'day'
      )
    ).toEqual({ datasets: [{ data: [3, 4] }], labels: ['21.6', '23.6'] });
  });

  it('getChartDataByKeyAndInterval wins day', () => {
    const transformedData = transform(dataMock);

    expect(
      charts.getChartDataByKeyAndInterval(
        transformedData.games,
        'mpn',
        'wins',
        'day',
        {label: 'wins'}
      )
    ).toEqual({
      datasets: [{ data: [2, 3], label: 'wins' }],
      labels: ['21.6', '23.6']
    });
  });

  it('getChartDataByKeyAndInterval losses day', () => {
    const transformedData = transform(dataMock);

    expect(
      charts.getChartDataByKeyAndInterval(
        transformedData.games,
        'mpn',
        'losses',
        'day',
        {label: 'losses'}
      )
    ).toEqual({
      datasets: [{ data: [1, 1], label: 'losses' }],
      labels: ['21.6', '23.6']
    });
  });

  it('getChartDataByKeyAndInterval mmr weeks', () => {
    const transformedData = transform(dataMock);

    expect(
      charts.getChartDataByKeyAndInterval(
        transformedData.games,
        'mpn',
        'elo',
        'week',
        {label: 'MMR weeks'}
      )
    ).toEqual({
      datasets: [{ data: [1557], label: 'MMR weeks' }],
      labels: [25]
    });
  });

  it('combine datasets', () => {
    const setA = {
      datasets: [{ data: [2, 3], label: 'wins' }],
      labels: ['21.6', '23.6']
    };
    const setB = {
      datasets: [{ data: [1, 1], label: 'losses' }],
      labels: ['21.6', '23.6']
    };
    expect(charts.combineChartData([setA, setB])).toEqual({
      datasets: [{ data: [2, 3], label: 'wins' }, { data: [1, 1], label: 'losses' }],
      labels: ['21.6', '23.6']
    });
  });
});
