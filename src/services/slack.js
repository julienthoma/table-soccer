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

function createPlayerTitle({ name, elo, id }, position) {
  const playerUrl = 'http://example.com';
  return `_${position}_ \n *<${playerUrl}|${name}>* \n _${elo}_`;
}
