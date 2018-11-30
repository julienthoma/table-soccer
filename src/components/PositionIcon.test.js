import React from 'react';
import { renderWithMuiTheme } from '../test.utils';
import PositionIcon from './PositionIcon';

it('PositionIcon renders correctly', () => {
  expect(renderWithMuiTheme(<PositionIcon count={3} dark />)).toMatchSnapshot();
});
