import React from 'react';
import PropTypes from 'prop-types';
import './PlayerIcon.scss';

const PlayerIcon = ({ dark }) =>
  <div styleName={`root ${ dark ? 'color--dark' : ''}`}>
    <div styleName="head" />
    <div styleName="body" />
  </div>;


PlayerIcon.propTypes = {
  dark: PropTypes.bool.isRequired
};

export default PlayerIcon;
