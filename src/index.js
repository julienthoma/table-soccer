import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import App from './containers/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

addLocaleData(de);

let enhancers = applyMiddleware(thunk);

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers = compose(enhancers, window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(reducer, enhancers);

render(
  <Provider store={store}>
    <IntlProvider locale={'de'}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('react-container')
);
