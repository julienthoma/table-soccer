import { transform } from './transformer';
import rawData from './__mocks__/rawData.json';
import expectedOutput from './__mocks__/exspected_output.json';

describe('Transformer', () => {
  it('game transform', () => {
    const transformedData = JSON.parse(JSON.stringify(transform(rawData)));
    expect(transformedData).toEqual(expectedOutput);
  });
});
