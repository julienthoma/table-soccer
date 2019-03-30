import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { BLUE, GREY } from './Colors';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const BarWrapper = styled.div`
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
  flex-grow: ${props => props.leftGrow};
`;

const RightPart = styled(Part)`
  flex-grow: ${props => props.rightGrow};
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
  leftGrow,
  rightGrow,
  leftColor,
  rightColor
}) => (
  <Container>
    <BarWrapper>
      <LeftPart leftGrow={leftGrow} color={leftColor} />
      <RightPart rightGrow={rightGrow} color={rightColor} />
    </BarWrapper>
    <LeftText>{leftText}</LeftText>
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
  leftGrow: PropTypes.number.isRequired,
  rightGrow: PropTypes.number.isRequired
};

export default Bar;
