import { createStartGameMessage } from './Slack';

describe('Slack', () => {
  it('createStartGameMessage', () => {
    const startGameMessage = createStartGameMessage({
      creator: 'Peter',
      creatorUrl: 'http://example.com',
      team1Attack: {
        elo: 2500,
        name: 'Marius',
        id: 'msb'
      },
      team1Defense: {
        elo: 1900,
        name: 'Christian',
        id: 'chr'
      },
      team2Attack: {
        elo: 3000,
        name: 'Alex',
        id: 'aku'
      },
      team2Defense: {
        elo: 2200,
        name: 'Julien',
        id: 'jth'
      }
    });

    expect(startGameMessage.username).toEqual('Kicker Bot');
    const attachment = startGameMessage.attachments[0];
    expect(attachment.author_name).toEqual('Peter started a new game');
    expect(attachment.author_link).toEqual('http://example.com');

    expect(attachment.fields[0].value).toEqual('ø 2200');
    expect(attachment.fields[1].value).toEqual('ø 2600');
    expect(attachment.fields[2].value).toEqual(
      '_Attack_ \n *<http://example.com|Marius>* \n _2500_'
    );
    expect(attachment.fields[3].value).toEqual(
      '_Attack_ \n *<http://example.com|Alex>* \n _3000_'
    );
    expect(attachment.fields[4].value).toEqual(
      '_Defense_ \n *<http://example.com|Christian>* \n _1900_'
    );
    expect(attachment.fields[5].value).toEqual(
      '_Defense_ \n *<http://example.com|Julien>* \n _2200_'
    );
  });
});
