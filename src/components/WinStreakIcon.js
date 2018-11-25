import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hot from 'material-ui/svg-icons/social/whatshot';

const HotNumber = styled.div`
  position: absolute;
  color: black;
  top: -8px;
  font-weight: 600;
  right: -2px;
`;

const Wrapper = styled.div`
  position: relative;
  font-size: 15px;
  max-width: 24px;
  display: inline-block;
`;

const WinStreakIcon = ({ count }) => {
  if (count < 3) {
    return false;
  }

  return (
    <Wrapper>
      <Hot color={getColorByCount(count)} />
      <HotNumber>{count}</HotNumber>
    </Wrapper>
  );
};

function getColorByCount(count) {
  if (count >= 10) {
    return '#9C27B0';
  }

  if (count >= 7) {
    return '#B71C1C';
  }

  if (count >= 5) {
    return '#E91E63';
  }

  if (count >= 3) {
    return '#F57C00';
  }
}

WinStreakIcon.propTypes = {
  count: PropTypes.number.isRequired
};

export default WinStreakIcon;
