import React from 'react';
import { FormattedDate } from 'react-intl';
import GameList from '../components/GameList';
import ScoreTimeline from '../components/ScoreTimeline';
import {List, ListItem} from 'material-ui/List';

const GameDetail = ({ game, players }) => {

  const startdate = new Date(game.startdate);
  const enddate = new Date(game.enddate);
  const durationInSeconds = ((enddate.valueOf() - startdate.valueOf()) / 1000000).toFixed(2);


  console.log(game)

  return (
    <div>

      <GameList games={[game]}/>

      <List>
        <ListItem primaryText={
        <FormattedDate
            value={game.startdate}
            year='numeric'
            month='long'
            day='2-digit'
            hour='numeric'
            minute='numeric'
          />}
        />
        <ListItem primaryText={'Dauer: ' + durationInSeconds + ' Minuten'} />
      </List>


      <ScoreTimeline game={game} players={players}/>
    </div>
  );
};

export default GameDetail;
