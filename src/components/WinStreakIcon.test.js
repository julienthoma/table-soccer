import React from 'react';
import { renderWithMuiTheme } from '../test.utils';
import WinStreakIcon from './WinStreakIcon';

it('WinStreakIcon renders correctly', () => {
  expect(renderWithMuiTheme(<WinStreakIcon count={3} />)).toMatchSnapshot();
});
