import React from 'react';
import { renderWithMuiTheme } from '../test.utils';
import Bar from './Bar';

it('Bar renders correctly', () => {
  const bar = (
    <Bar
      leftText="Hello"
      rightText="World"
      widthInPercent="50%"
      leftColor="red"
      rightColor="green"
    />
  );
  expect(renderWithMuiTheme(bar)).toMatchSnapshot();
});
