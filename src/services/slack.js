export const createStartGameMessage = ({
  creator,
  creatorUrl,
  team1Attack,
  team1Defense,
  team2Attack,
  team2Defense
}) => ({
  username: 'Kicker Bot',
  attachments: [
    {
      author_icon: 'http://flickr.com/icons/bobby.jpg',
      author_name: `${creator} started a new game`,
      author_link: creatorUrl,
      fields: [
        {
          title: 'Team 1',
          value: `ø ${Math.round((team1Attack.elo + team1Defense.elo) / 2)}`,
          short: true
        },
        {
          title: 'Team 2',
          value: `ø ${Math.round((team2Attack.elo + team2Defense.elo) / 2)}`,
          short: true
        },
        {
          value: createPlayerTitle(team1Attack, 'Attack'),
          short: true
        },
        {
          value: createPlayerTitle(team2Attack, 'Attack'),
          short: true
        },
        {
          value: createPlayerTitle(team1Defense, 'Defense'),
          short: true
        },
        {
          value: createPlayerTitle(team2Defense, 'Defense'),
          short: true
        }
      ],
      mrkdwn_in: ['author_name', 'fields']
    }
  ]
});

export const createGoalMessage = ({
  goalScorer,
  color,
  team1Score,
  team2Score
}) => ({
  username: 'Kicker Bot',
  attachments: [
    {
      author_name: `${goalScorer.name} just scored a Goal`,
      color,
      author_link: 'https://example.com',
      fields: [
        {
          value: `_Team 1_ \n *${team1Score}*`,
          short: true
        },
        {
          value: `_Team 2_ \n *${team2Score}*`,
          short: true
        }
      ],
      mrkdwn_in: ['author_name', 'fields']
    }
  ]
});

export const createEndMessage = ({
  color,
  gameId,
  winnerTeam,
  team1Score,
  team2Score,
  team1Attack,
  team1Defense,
  team2Attack,
  team2Defense
}) => ({
  username: 'Kicker Bot',

  attachments: [
    {
      color,
      author_name: 'Game Details',
      pretext: `${winnerTeam} has won the game`,
      author_link: 'http://www.hongkiat.com/blog/author/preethi/',
      // footer: TODO: MVP feature',
      fields: [
        {
          title: 'Team 1',
          value: `*${team1Score}*`,
          short: true
        },
        {
          title: 'Team 2',
          value: `*${team1Score}*`,
          short: true
        },
        {
          value: createPlayerTitle(team1Attack, 'Attack'),
          short: true
        },
        {
          value: createPlayerTitle(team2Attack, 'Attack'),
          short: true
        },
        {
          value:
            createPlayerTitle(team1Defense, 'Defense'),
          short: true
        },
        {
          value: createPlayerTitle(team2Defense, 'Defense'),
          short: true
        }
      ],
      mrkdwn_in: ['author_name', 'fields']
    }
  ]
});

function createPlayerTitle({ name, elo, id }, position, gain = null) {
  const playerUrl = 'http://example.com';
  const eloGain = gain ? ` (${gain > 0 ? '+' : ''}${gain})` : '';

  return `_${position}_ \n *<${playerUrl}|${name}>* \n _${elo}_${eloGain}`;
}
