import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BLUE, GREY } from './Colors';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const Part = styled.div`
  position: relative;
  background: ${props => props.color};
  height: 20px;
`;

const LeftPart = styled(Part)`
  width: ${props => props.width};
`;

const RightPart = styled(Part)`
  flex-grow: 1;
`;

const Text = styled.div`
  position: absolute;
  top: 3px;
  text-transform: uppercase;
  font-size: 13px;
`;

const LeftText = styled(Text)`
  left: 10px;
`;

const RightText = styled(Text)`
  right: 10px;
`;

const Bar = ({
  leftText,
  rightText,
  leftColor,
  rightColor,
  widthInPercent
}) => (
  <Container>
    <LeftPart width={widthInPercent} color={leftColor} />
    <LeftText>{leftText}</LeftText>
    <RightPart color={rightColor} />
    <RightText>{rightText}</RightText>
  </Container>
);

Bar.defaultProps = {
  leftText: '',
  rightText: '',
  leftColor: BLUE,
  rightColor: GREY
};

Bar.propTypes = {
  leftText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rightText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  leftColor: PropTypes.string,
  rightColor: PropTypes.string,
  widthInPercent: PropTypes.string.isRequired
};

export default Bar;
