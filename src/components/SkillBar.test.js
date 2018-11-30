import React from 'react';
import { renderWithMuiTheme } from '../test.utils';
import SkillBar from './SkillBar';

it('SkillBar renders correctly', () => {
  const bar = (
    <SkillBar
      leftHeadline="Hello"
      factor={0.3}
      value={20}
      best={100}
      bestPlayerId="fubar"
    />
  );
  expect(renderWithMuiTheme(bar)).toMatchSnapshot();
});
