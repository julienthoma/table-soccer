export const createStartGameMessage = () => ({
  username: 'Kicker Bot',
  attachments: [
    {
      author_icon: 'http://flickr.com/icons/bobby.jpg',
      author_name: 'Marius started a new game',
      author_link: 'http://www.hongkiat.com/blog/author/preethi/',
      fields: [
        {
          title: 'Team 1',
          value: 'ø 2300',
          short: true
        },
        {
          title: 'Team 2',
          value: 'ø 1900',
          short: true
        },
        {
          value: '_Attack_ \n *<http://example.com|Marius>* \n _2500_',
          short: true
        },
        {
          value: '_Attack_ \n *<http://example.com|Alex>* \n _3000_',
          short: true
        },
        {
          value: '_Defense_ \n *<http://example.com|Christian>* \n _1900_',
          short: true
        },
        {
          value: '_Defense_ \n *<http://example.com|Julien>* \n _2200_',
          short: true
        }
      ],
      mrkdwn_in: ['author_name', 'fields']
    }
  ]
});
