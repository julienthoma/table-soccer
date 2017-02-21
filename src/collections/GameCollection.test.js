import GameCollection from './GameCollection';
import testData from '../__mocks__/testData';

describe('Game Collection', () => {
  it('filterByPlayer', () => {
    const gameCollection = new GameCollection(testData.games);

    expect(gameCollection.filterByPlayer('jth').length).toEqual(12);
    expect(gameCollection.filterByPlayer('chr').length).toEqual(9);
  });

  it('filterByPlayerWins', () => {
    const gameCollection = new GameCollection(testData.games);

    expect(gameCollection.filterByPlayerWins('jth').length).toEqual(5);
    expect(gameCollection.filterByPlayerWins('chr').length).toEqual(7);
  });

  it('filterByPlayerLosses', () => {
    const gameCollection = new GameCollection(testData.games);

    expect(gameCollection.filterByPlayerLosses('jth').length).toEqual(7);
    expect(gameCollection.filterByPlayerLosses('chr').length).toEqual(2);
  });

  it('getDuration', () => {
    const gameCollection = new GameCollection(testData.games);

    expect(gameCollection.getDuration()).toEqual(6683);
  });

  it('filterPlayerByPosition', () => {
    const gameCollection = new GameCollection(testData.games);

    expect(gameCollection.filterByPosition('jth', 'front').length).toEqual(6);
    expect(gameCollection.filterByPosition('jth', 'rear').length).toEqual(6);
  });

  it('getGoalsByPlayer', () => {
    const gameCollection = new GameCollection(testData.games);

    expect(gameCollection.getGoalsByPlayer('jth')).toEqual(28);
    expect(gameCollection.getGoalsByPlayer('chr')).toEqual(33);
    expect(gameCollection.getGoalsByPlayer('msb')).toEqual(21);
  });
});