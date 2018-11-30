import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Headline4 } from './Typography';
import { FlexContainer } from './Layout';
import { BLUE, PINK } from './Colors';
import Bar from './Bar';

const Container = styled.div`
  width: 100%;
  padding: 5px 0;
  overflow: hidden;
`;

const CompareBar = ({
  leftHeadline,
  rightHeadline,
  factor,
  leftValue,
  rightValue
}) => (
  <Container>
    <FlexContainer>
      <Headline4>{leftHeadline}</Headline4>
      <Headline4>{rightHeadline}</Headline4>
    </FlexContainer>

    <Bar
      leftText={leftValue}
      rightText={rightValue}
      factor={factor}
      leftColor={BLUE}
      rightColor={PINK}
    />
  </Container>
);

CompareBar.propTypes = {
  leftHeadline: PropTypes.string.isRequired,
  rightHeadline: PropTypes.string.isRequired,
  factor: PropTypes.number.isRequired,
  leftValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  rightValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};

export default CompareBar;
