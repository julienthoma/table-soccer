import React from 'react';
import { renderWithMuiTheme } from '../test.utils';
import Bar from './Bar';

it('renders correctly', () => {
  const bar = <Bar leftText="Hello" rightText="World" widthInPercent="50%" />;
  expect(renderWithMuiTheme(bar)).toMatchSnapshot();
});
