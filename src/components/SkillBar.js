import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Headline4 } from './Typography';
import { FlexContainer } from './Layout';
import Bar from './Bar';
import { getFactor } from '../services/Helper';

const Container = styled.div`
  width: 100%;
  padding: 5px 0;
  overflow: hidden;
`;

const SkillBar = ({ headline, value, property, inverse }) => {
  const bestValue = inverse
    ? property.min.value.toFixed(2)
    : property.max.value.toFixed(2);
  const bestPlayerId = inverse ? property.min.id : property.max.id;

  const factor = getFactor(
    value,
    property.min.value,
    property.max.value,
    inverse
  );

  return (
    <Container>
      <FlexContainer>
        <Headline4>{headline}</Headline4>
        <Headline4>Best</Headline4>
      </FlexContainer>

      <Bar
        leftText={value}
        rightText={`${bestValue} (${bestPlayerId})`}
        leftGrow={factor}
        rightGrow={1 - factor}
      />
    </Container>
  );
};

SkillBar.propTypes = {
  headline: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default SkillBar;
