import React from 'react';
import GameListItem from '../components/GameListItem';

const GameList = ({ games, handleRowClick }) => {
  return (
    <div className="game-list">
      {
        games.orderByDate().items.map((game, index) =>
          <GameListItem key={index} game={game} handleClick={handleRowClick} />
        )}
    </div>
  );
};

export default GameList;
