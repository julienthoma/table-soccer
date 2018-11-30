/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GREY_DARK, GREY_LIGHT } from './Colors';

const HEAD_SIZE = 8;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1px;
`;

const Head = styled.div`
  background: ${props => (props.dark ? GREY_DARK : GREY_LIGHT)};
  height: ${HEAD_SIZE}px;
  width: ${HEAD_SIZE}px;
  border-radius: 50px;
`;

const Body = styled.div`
  background: ${props => (props.dark ? GREY_DARK : GREY_LIGHT)};
  margin-top: 1px;
  width: ${1.3 * HEAD_SIZE}px;
  height: ${1.8 * HEAD_SIZE}px;
  border-top-left-radius: ${HEAD_SIZE}px;
  border-top-right-radius: ${HEAD_SIZE}px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const PlayerIcon = ({ dark }) => (
  <Container>
    <Head />
    <Body />
  </Container>
);

PlayerIcon.propTypes = {
  dark: PropTypes.bool.isRequired
};

export default PlayerIcon;
