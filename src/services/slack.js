import { TEAM1_COLOR, TEAM2_COLOR } from '../constants/';

export const createStartGameMessage = (
  creator,
  team1Attack,
  team1Defense,
  team2Attack,
  team2Defense
) => ({
  username: 'Kicker Bot',
  attachments: [
    {
      author_icon: createPlayerUrl(creator.id),
      author_name: `${creator.name} started a new game`,
      author_link: creator.profileUrl,
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

export const createGoalMessage = (
  goalScorer,
  team1Score,
  team2Score,
  isOwngoal
) => {
  const message = isOwngoal
    ? `${goalScorer.name} just scored a own goal :joy::joy::joy:`
    : `${goalScorer.name} just scored a Goal`;

  return {
    username: 'Kicker Bot',
    attachments: [
      {
        author_name: message,
        color: goalScorer.index <= 1 ? TEAM1_COLOR : TEAM2_COLOR,
        author_link: createPlayerUrl(goalScorer.id),
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
  };
};

export const createEndMessage = (
  gameId,
  team1Score,
  team2Score,
  team1Attack,
  team1Defense,
  team2Attack,
  team2Defense,
) => ({
  username: 'Kicker Bot',

  attachments: [
    {
      color: team1Score > team2Score ? TEAM1_COLOR : TEAM2_COLOR,
      author_name: 'Game Details',
      pretext: `${team1Score > team2Score
        ? 'Team 1'
        : 'Team 2'} has won the game`,
      author_link: createGameUrl(gameId),
      // footer: TODO: MVP feature',
      fields: [
        {
          title: 'Team 1',
          value: `*${team1Score}*`,
          short: true
        },
        {
          title: 'Team 2',
          value: `*${team2Score}*`,
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

function createPlayerTitle({ name, elo, id }, position, gain = null) {
  const eloGain = gain ? ` (${gain > 0 ? '+' : ''}${gain})` : '';

  return `_${position}_ \n *<${createPlayerUrl(
    id
  )}|${name}>* \n _${elo}_${eloGain}`;
}

function createPlayerUrl(playerId) {
  return `${window.location.origin}/player/${playerId}`;
}

function createGameUrl(gameId) {
  return `${window.location.origin}/game/${gameId}`;
}
