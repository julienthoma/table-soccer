import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import PlayerIcon from './PlayerIcon';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const PositionIcon = ({ count, dark }) => (
  <Container>
    {[...Array(count)].map((e, i) => (
      // eslint-disable-next-line
      <PlayerIcon key={i} dark={dark} />
    ))}
  </Container>
);

PositionIcon.defaultProps = {
  dark: false,
  count: 1
};

PositionIcon.propTypes = {
  count: PropTypes.number,
  dark: PropTypes.bool
};

export default PositionIcon;
