import React from 'react';
import { renderWithMuiTheme } from '../test.utils';
import SkillBar from './SkillBar';

it('SkillBar renders correctly', () => {
  const bar = (
    <SkillBar
      headline="Hello"
      value={20}
      property={{
        min: {
          value: 5,
          id: 'Heinrich'
        },
        max: {
          value: 20,
          id: 'Gustav'
        }
      }}
      inverse
    />
  );
  expect(renderWithMuiTheme(bar)).toMatchSnapshot();
});
