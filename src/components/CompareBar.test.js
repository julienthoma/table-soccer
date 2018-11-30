import React from 'react';
import { renderWithMuiTheme } from '../test.utils';
import CompareBar from './CompareBar';

it('CompareBar renders correctly', () => {
  const bar = (
    <CompareBar
      leftHeadline="Hello"
      rightHeadline="World"
      factor={0.3}
      leftValue="TestString"
      rightValue={3}
    />
  );
  expect(renderWithMuiTheme(bar)).toMatchSnapshot();
});
