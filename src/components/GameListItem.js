import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import styled from '@emotion/styled';
import WinStreakIcon from './WinStreakIcon';
import { Box, Text, Flex } from '.';
import { gameShape } from '../proptypes';

const Container = styled(Box)`
  &:nth-last-of-type(even) {
    background: #f3f3f3;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Player = ({ name, elo, eloGain, isAttack, isWinner, winStreak }) => {
  const emoji = isAttack ? '⚔️' : '🛡';
  return (
    <Box p={2}>
      <Flex justifyContent="center">
        <Text fontSize={3} color="grey.2">
          {emoji} {name}
        </Text>
        {isWinner && <WinStreakIcon count={winStreak} />}
      </Flex>
      <Text fontSize={2} color="grey.2" textAlign="center">
        {elo}&nbsp;
        <Text color={isWinner ? 'green' : 'red'} as="span">
          ({isWinner && '+'}{eloGain})
        </Text>
      </Text>
    </Box>
  );
};

const GameListItem = ({ game, handleClick }) => {
  const winnerAttack = game.players[game.winnerAttack.id];
  const winnerDefense = game.players[game.winnerDefense.id];
  const loserAttack = game.players[game.loserAttack.id];
  const loserDefense = game.players[game.loserDefense.id];

  return (
    <Container width={1} color="grey.0" py={1} onClick={handleClick(game)}>
      <Text color="grey.0" py={2} fontStyle="italic" textAlign="right">
        <FormattedDate
          value={game.startdate}
          month="long"
          day="2-digit"
          hour="numeric"
          minute="numeric"
        />
        ,&nbsp; ({Math.round(game.duration / 60)}min)
      </Text>
      <Flex justifyContent="space-between">
        <Flex flex="1 0 100px" flexDirection="column">
          <Player
            name={winnerAttack.name}
            elo={winnerAttack.elo}
            eloGain={winnerAttack.eloGain}
            isAttack
            isWinner
            winStreak={winnerAttack.winStreak}
          />
          <Player
            name={winnerDefense.name}
            elo={winnerDefense.elo}
            eloGain={winnerDefense.eloGain}
            isAttack={false}
            isWinner
            winStreak={winnerDefense.winStreak}
          />
        </Flex>
        <Text color="grey.0" fontSize={6} mt={3}>
          {game.winnerScore} : {game.loserScore}
        </Text>
        <Flex flexBasis={100} flex="1 0 100px" flexDirection="column">
          <Player
            name={loserAttack.name}
            elo={loserAttack.elo}
            eloGain={loserAttack.eloGain}
            isAttack
            isWinner={false}
            winStreak={loserAttack.winStreak}
          />
          <Player
            name={loserDefense.name}
            elo={loserDefense.elo}
            eloGain={loserDefense.eloGain}
            isAttack={false}
            isWinner={false}
            winStreak={loserDefense.winStreak}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

GameListItem.defaultProps = {
  handleClick: () => () => false
};

GameListItem.propTypes = {
  game: gameShape.isRequired,
  handleClick: PropTypes.func
};

export default GameListItem;
