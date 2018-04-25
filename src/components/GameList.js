import React from 'react';
import PropTypes from 'prop-types';
import Infinite from 'react-infinite';
import CompletedGameListItem from '../components/CompletedGameListItem';
import { gameShape } from '../proptypes';

const GameList = ({ games, handleRowClick }) =>
  <div className="game-list">
    <Infinite
      elementHeight={140}
      useWindowAsScrollContainer
      preloadBatchSize={Infinite.containerHeightScaleFactor(3)}
    >
      {games.map(game =>
        <CompletedGameListItem key={game.id} game={game} handleClick={handleRowClick} />
      )}
    </Infinite>
  </div>;

GameList.propTypes = {
  handleRowClick: PropTypes.func.isRequired,
  games: PropTypes.arrayOf(gameShape).isRequired
};

export default GameList;
