import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Headline4 } from './Typography';
import { FlexContainer } from './Layout';
import Bar from './Bar';

const Container = styled.div`
  width: 100%;
  padding: 5px 0;
  overflow: hidden;
`;

const SkillBar = ({ factor, leftHeadline, value, best, bestPlayerId }) => (
  <Container>
    <FlexContainer>
      <Headline4>{leftHeadline}</Headline4>
      <Headline4>Best</Headline4>
    </FlexContainer>

    <Bar
      leftText={value}
      rightText={`${best} (${bestPlayerId})`}
      factor={factor}
    />
  </Container>
);

SkillBar.propTypes = {
  factor: PropTypes.number.isRequired,
  leftHeadline: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  best: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  bestPlayerId: PropTypes.string.isRequired
};

export default SkillBar;
