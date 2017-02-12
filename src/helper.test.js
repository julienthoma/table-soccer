import * as helper from './helper';

const state = {
  players: [
    {
      "name": "Julien",
      "id": "jth"
    },
    {
      "name": "Christian",
      "id": "chr"
    },
    {
      "name": "Marius",
      "id": "msb"
    },
    {
      "name": "Alex",
      "id": "aku"
    }
  ],
  games: [{"startdate":"2017-02-07T23:26:47.568Z","enddate":"2017-02-07T23:26:52.280Z","scoreTimeline":[{"goalScorer":"team1FrontPlayer","timestamp":"2017-02-07T23:26:49.655Z"},{"goalScorer":"team1FrontPlayer","timestamp":"2017-02-07T23:26:50.919Z"},{"goalScorer":"team1FrontPlayer","timestamp":"2017-02-07T23:26:51.193Z"},{"goalScorer":"team1FrontPlayer","timestamp":"2017-02-07T23:26:51.459Z"},{"goalScorer":"team1FrontPlayer","timestamp":"2017-02-07T23:26:51.736Z"},{"goalScorer":"team1FrontPlayer","timestamp":"2017-02-07T23:26:52.273Z"}],"winners":[{"score":6,"position":"front"},{"score":0,"position":"rear"}],"losers":[{"score":0,"position":"front"},{"score":0,"position":"rear"}],"id":"eeaf027bc9ea7334d4f0b91e8196dea3296b746a"},{"startdate":"2017-02-07T23:27:38.821Z","enddate":"2017-02-07T23:27:40.401Z","scoreTimeline":[{"goalScorer":"team2RearPlayer","timestamp":"2017-02-07T23:27:39.569Z"},{"goalScorer":"team2RearPlayer","timestamp":"2017-02-07T23:27:39.796Z"},{"goalScorer":"team2RearPlayer","timestamp":"2017-02-07T23:27:39.894Z"},{"goalScorer":"team2RearPlayer","timestamp":"2017-02-07T23:27:40.049Z"},{"goalScorer":"team2RearPlayer","timestamp":"2017-02-07T23:27:40.215Z"},{"goalScorer":"team2RearPlayer","timestamp":"2017-02-07T23:27:40.394Z"}],"winners":[{"score":0,"name":"Marius","position":"front"},{"score":6,"name":"Alex","position":"rear"}],"losers":[{"score":0,"name":"Julien","position":"front"},{"score":0,"name":"Christian","position":"rear"}],"id":"37e6a9e11820aa63086a95437c4cba62fd179c1f"}],
  newGame: {
    scoreTimeline: [
      {
        position: 'team1RearPlayer',
        timestamp: '2017-02-09T17:28:42.199Z',
        name: 'Christian'
      },
      {
        position: 'team1FrontPlayer',
        timestamp: '2017-02-09T17:28:43.472Z',
        name: 'Julien'
      },
      {
        position: 'team1FrontPlayer',
        timestamp: '2017-02-09T17:28:43.741Z',
        name: 'Julien'
      },
      {
        position: 'team1FrontPlayer',
        timestamp: '2017-02-09T17:28:43.947Z',
        name: 'Julien'
      },
      {
        position: 'team1FrontPlayer',
        timestamp: '2017-02-09T17:28:44.179Z',
        name: 'Julien'
      },
      {
        position: 'team1FrontPlayer',
        timestamp: '2017-02-09T17:28:44.761Z',
        name: 'Julien'
      },
      {
        position: 'team1FrontPlayer',
        timestamp: '2017-02-09T17:28:45.260Z',
        name: 'Julien'
      }
    ]
  }
};

const getState = () => state;
helper.setGetState(getState);

describe('helper', () => {
  it('getPlayerByName', () => {
    expect(helper.getPlayerByName('Julien')).toEqual({
      "name": "Julien",
      "id": "jth"
    });

    expect(helper.getPlayerByName('Alex')).toEqual({
      "name": "Alex",
      "id": "aku"
    });
  });

  it('getScoreByPosition', () => {
    expect(helper.getScoreByPosition('team1FrontPlayer')).toEqual(6);
    expect(helper.getScoreByPosition('team1RearPlayer')).toEqual(1);
  });
});