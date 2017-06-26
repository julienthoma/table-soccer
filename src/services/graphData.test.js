import * as graphData from './graphData';
import gameMock from './__mocks__/gameMock';

describe('Graph Data', () => {
  it('getMmmrOfWeeks', () => {
    const games = gameMock.slice(0);
    expect(graphData.getMmmrOfWeeks(games, 'jth')).toEqual({
      data: [1511, 1471, 1487, 1450, 1492],
      labels: [5, 9, 15, 20, 24]
    });
  });

  it('normalize data', () => {
    const property = {
      max: { value: 2500 },
      min: { value: 1200 }
    };

    expect(graphData.normalizeValue(1200, property)).toEqual(1);
    expect(graphData.normalizeValue(1201, property)).toEqual(1);
    expect(graphData.normalizeValue(2499, property)).toEqual(10);
    expect(graphData.normalizeValue(1330, property)).toEqual(1);
    expect(graphData.normalizeValue(1331, property)).toEqual(2);

    expect(graphData.normalizeValue(1200, property, true)).toEqual(10);
    expect(graphData.normalizeValue(2499, property, true)).toEqual(1);
    expect(graphData.normalizeValue(1331, property, true)).toEqual(9);

    const property2 = {
      max: { value: 0.9 },
      min: { value: 0.3 }
    };

    expect(graphData.normalizeValue(0.3, property2)).toEqual(1);
    expect(graphData.normalizeValue(0.4, property2)).toEqual(2);
    expect(graphData.normalizeValue(0.89, property2)).toEqual(10);
    expect(graphData.normalizeValue(0.9, property2)).toEqual(10);
  });
});
