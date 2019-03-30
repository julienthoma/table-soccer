import transform from './transformer';
import gameMock from './__mocks__/dataMock.json';

describe('Transformer', () => {
  const transformedData = transform(gameMock);

  it('game transform', () => {
    expect(transformedData.games.length).toEqual(4);
    const [game1] = transformedData.games;

    expect(game1.id).toEqual('BJZf3fuQb');

    expect(game1.startdate).toEqual(new Date(1498061833063));
    expect(game1.duration).toEqual(451);
    expect(Object.keys(game1.players).length).toEqual(4);
    const p1 = game1.players.msb;
    const p2 = game1.players.mpn;
    const p3 = game1.players.jth;
    const p4 = game1.players.chr;

    expect(p2.goals).toEqual(1);
    expect(p1.goals).toEqual(5);
    expect(p3.goals).toEqual(1);
    expect(p4.goals).toEqual(2);

    expect(p1.goalTimings.length).toEqual(5);
    expect(p2.goalTimings.length).toEqual(0);
    expect(p3.goalTimings.length).toEqual(1);
    expect(p4.goalTimings.length).toEqual(0);

    expect(p1.goalTimings[0]).toEqual(206);
    expect(p3.goalTimings[0]).toEqual(416);

    expect(p1.goalAgainstTimings.length).toEqual(0);
    expect(p2.goalAgainstTimings.length).toEqual(6);
    expect(p3.goalAgainstTimings.length).toEqual(0);
    expect(p4.goalAgainstTimings.length).toEqual(3);

    expect(p2.goalAgainstTimings[0]).toEqual(206);
    expect(p4.goalAgainstTimings[0]).toEqual(91);
  });
});
