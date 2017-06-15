import React from 'react';
import PropTypes from 'prop-types';
import Infinite from 'react-infinite';
import GameListItem from '../components/GameListItem';
import { gameShape } from '../proptypes';

const GameList = ({ games, handleRowClick }) => (
  <div className="game-list">
    <Infinite
      elementHeight={140}
      useWindowAsScrollContainer
      preloadBatchSize={Infinite.containerHeightScaleFactor(3)}
    >
      {games.map(game =>
        <GameListItem
          key={game.id}
          game={game}
          handleClick={handleRowClick}
        />
      )}
    </Infinite>
  </div>
);

GameList.propTypes = {
  handleRowClick: PropTypes.func.isRequired,
  games: PropTypes.arrayOf(gameShape).isRequired
};

export default GameList;
