import { transform } from './transformer';

const mockData = {
  players: {
    p1: {
      name: 'Player 1',
      id: 'p1'
    },
    p2: {
      name: 'Player 2',
      id: 'p2'
    },
    p3: {
      name: 'Player 3',
      id: 'p3'
    },
    p4: {
      name: 'Player 4',
      id: 'p4'
    }
  },
  games: [
    [
      'ryQblMZ8I8x-',
      1494020305385,
      469,
      ['p1', 'p3', 'p2', 'p4'],
      [6, 0, 5, 0],
      [
        ['p2', 2, 87],
        ['p2', 2, 118],
        ['p1', 0, 180],
        ['p2', 2, 208],
        ['p1', 0, 227],
        ['p1', 0, 273],
        ['p2', 2, 297],
        ['p2', 2, 345],
        ['p1', 0, 388],
        ['p1', 0, 431],
        ['p1', 0, 469]
      ]
    ],
    [
      'S1LWxGbIIUgb',
      1494252597545,
      559,
      ['p2', 'p3', 'p4', 'p1'],
      [1, 5, 2, 2],
      [
        ['p1', 3, 17],
        ['p3', 1, 124],
        ['p3', 1, 215],
        ['p2', 0, 227],
        ['p3', 1, 240],
        ['p4', 2, 438],
        ['p4', 2, 456],
        ['p1', 3, 469],
        ['p3', 1, 483],
        ['p3', 1, 559]
      ]
    ]
  ]
};

describe('transformer', () => {
  const transformedData = transform(mockData);

  it('game transform', () => {
    expect(transformedData.games.length).toEqual(2);
    const [game1, game2] = transformedData.games;

    expect(game1.id).toEqual('ryQblMZ8I8x-');
    expect(game2.id).toEqual('S1LWxGbIIUgb');

    expect(game1.startdate).toEqual(new Date(1494020305385));
    expect(game1.duration).toEqual(469);
    expect(Object.keys(game1.players).length).toEqual(4);
    const { p1, p2, p3, p4 } = game1.players;

    expect(p2.goals).toEqual(5);
    expect(p1.goals).toEqual(6);
    expect(p3.goals).toEqual(0);
    expect(p4.goals).toEqual(0);
    expect(p1.games).toEqual(1);
    expect(p1.isWinner).toEqual(true);
    expect(p2.isWinner).toEqual(false);
    expect(p1.position).toEqual('attack');

    const { winnerAttack, loserAttack, winnerDefense, loserDefense } = game1;
    expect(winnerAttack.id).toEqual('p1');
    expect(winnerAttack.score).toEqual(6);

    expect(loserAttack.id).toEqual('p2');
    expect(loserAttack.score).toEqual(5);

    expect(winnerDefense.id).toEqual('p3');
    expect(winnerDefense.score).toEqual(0);

    expect(loserDefense.id).toEqual('p4');
    expect(loserDefense.score).toEqual(0);

    expect(game1.loserScore).toEqual(5);
    expect(game1.winnerScore).toEqual(6);

    expect(game1.timeline.length).toEqual(11);

    expect(game1.timeline[0][0]).toEqual('p2');
    expect(game1.timeline[0][1]).toEqual(2);
    expect(game1.timeline[0][2]).toEqual(87);
  });

  it('player transform', () => {
    expect(transformedData.players.length).toEqual(4);
    const [p1, p2, p3, p4] = transformedData.players;

    expect(p1.name).toEqual('Player 1');
    expect(p2.name).toEqual('Player 2');
    expect(p3.name).toEqual('Player 3');
    expect(p4.name).toEqual('Player 4');

    expect(p1.id).toEqual('p1');
    expect(p1.games).toEqual(2);
    expect(p1.wins).toEqual(1);
    expect(p1.losses).toEqual(1);
    expect(p1.gamesAttack).toEqual(1);
    expect(p1.lossesAttack).toEqual(0);
    expect(p1.getWinPercentFormatted()).toEqual('50%');
  });

  it('elo gain', () => {
    const [game1] = transformedData.games;
    const { p1, p2, p3, p4 } = game1.players;

    // Winners
    expect(p1.eloGain).toBeGreaterThan(0);
    expect(p3.eloGain).toBeGreaterThan(0);
    // Losers
    expect(p2.eloGain).toBeLessThan(0);
    expect(p4.eloGain).toBeLessThan(0);
  });
});
