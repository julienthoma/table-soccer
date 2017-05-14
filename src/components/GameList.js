import React from 'react';
import Infinite from 'react-infinite';
import GameListItem from '../components/GameListItem';

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
  handleRowClick: React.PropTypes.func.isRequired
};

export default GameList;
