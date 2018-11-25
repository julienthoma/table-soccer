import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Headline4 } from './Typography';
import Bar from './Bar';
import { getFormattedPercent } from '../services/formatter';

const Container = styled.div`
  width: 100%;
  padding: 5px 0;
  overflow: hidden;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
      widthInPercent={getFormattedPercent(factor)}
    />
  </Container>
);

SkillBar.propTypes = {
  factor: PropTypes.number.isRequired,
  leftHeadline: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  best: PropTypes.string.isRequired,
  bestPlayerId: PropTypes.string.isRequired
};

export default SkillBar;
