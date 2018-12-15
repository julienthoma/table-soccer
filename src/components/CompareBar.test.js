import React from 'react';
import { renderWithMuiTheme } from '../test.utils';
import CompareBar from './CompareBar';

it('CompareBar renders correctly', () => {
  const bar = (
    <CompareBar
      leftHeadline="Hello"
      rightHeadline="World"
      leftValue={2}
      rightValue={3}
    />
  );
  expect(renderWithMuiTheme(bar)).toMatchSnapshot();
});
