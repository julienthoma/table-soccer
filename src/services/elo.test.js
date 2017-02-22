import * as elo from './elo';
import testData from '../__mocks__/testData';
import { setGetState } from '../helper';

const getState = () => testData;
setGetState(getState);

describe('elo', () => {
  it('calcScore', () => {
    expect(elo.calcFactor(1000, 1000)).toEqual(0.5);
    expect(elo.calcFactor(1000, 1300)).toEqual(0.75);
    expect(elo.calcFactor(1500, 1000)).toEqual(0.25);
  });
  //
  // it('calc2v2', () => {
  //   expect(elo.calc2v2(1000, 1000, 1000, 1000)).toEqual(0.5);
  // });

  it('calcPlayerElos', () => {
    expect(elo.calcPlayerElos()).toEqual(undefined);
  });
});
