import React from 'react';
import './PlayerIcon.scss';

const PlayerIcon = ({ dark }) =>
  <div styleName={`root ${ dark ? 'color--dark' : ''}`}>
    <div styleName="head" />
    <div styleName="body" />
  </div>;

export default PlayerIcon;
