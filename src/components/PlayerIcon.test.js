import React from 'react';
import { renderWithMuiTheme } from '../test.utils';
import PlayerIcon from './PlayerIcon';

it('PlayerIcon renders correctly', () => {
  expect(renderWithMuiTheme(<PlayerIcon dark />)).toMatchSnapshot();
});
