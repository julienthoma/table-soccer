import Game from './Game';
import gameMock from './__mocks__/game';

describe('Game', () => {
  it('create', () => {
    const game = new Game(gameMock);

    expect(game.raw._id).toEqual('58a37c0c734d1d56393dee57');
  });

  it('getScore', () => {
    const game = new Game(gameMock);

    expect(game.getScore()).toEqual({
      winner: 6,
      loser: 3
    });
  });

  it('getDuration', () => {
    const game = new Game(gameMock);
    expect(game.getDuration()).toEqual(581);
  });

  it('getGoalsByPlayer', () => {
    const game = new Game(gameMock);
    const expected = [{
      position: 'team1RearPlayer',
      timestamp: '2017-02-03T16:31:48.763Z',
      id: 'jth'
    }];
    expect(game.getGoalsByPlayer('jth')).toEqual(expected);
  });

  it('getPlayers', () => {
    const game = new Game(gameMock);
    const expected = [
      {
        score: 3,
        id: 'msb',
        position: 'front'
      },
      {
        score: 3,
        id: 'chr',
        position: 'rear'
      },
      {
        score: 2,
        id: 'aku',
        position: 'front'
      },
      {
        score: 1,
        id: 'jth',
        position: 'rear'
      }
    ];
    expect(game.getPlayers()).toEqual(expected);
  });

  it('getPlayerPosition', () => {
    const game = new Game(gameMock);
    expect(game.getPlayerPosition('jth')).toEqual('rear');
  });

  it('playerParticipates', () => {
    const game = new Game(gameMock);
    expect(game.playerParticipates('jth')).toEqual(true);
    expect(game.playerParticipates('chr')).toEqual(true);
    expect(game.playerParticipates('ema')).toEqual(false);
  });
});
