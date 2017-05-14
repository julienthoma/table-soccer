import * as helper from './helper';
import testData from '../__mocks__/testData';

const getState = () => testData;
helper.setGetState(getState);

describe('helper', () => {
  it('getPlayerByName', () => {
    expect(helper.getPlayerByName('Julien').name).toEqual('Julien');

    expect(helper.getPlayerByName('Alex').name).toEqual('Alex');
  });

  it('getGamesByPlayerId', () => {
    expect(helper.getGamesByPlayerId('jth').count()).toEqual(12);
    expect(helper.getGamesByPlayerId('chr').count()).toEqual(9);
  });

  it('getWinsByPlayer', () => {
    expect(helper.getWinsByPlayerId('jth').count()).toEqual(5);
    expect(helper.getWinsByPlayerId('chr').count()).toEqual(7);
  });

  it('getLossesByPlayer', () => {
    expect(helper.getLossesByPlayerId('jth').count()).toEqual(7);
    expect(helper.getLossesByPlayerId('chr').count()).toEqual(2);
  });
});
