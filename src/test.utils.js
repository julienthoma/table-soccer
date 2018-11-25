import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const renderWithMuiTheme = tree =>
  renderer.create(<MuiThemeProvider>{tree}</MuiThemeProvider>).toJSON();
