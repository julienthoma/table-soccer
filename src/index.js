import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import App from './containers/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { IntlProvider, addLocaleData } from 'react-intl';
import Home from './pages/Home';
import Games from './pages/Games';
import Game from './pages/Game';
import NewGame from './pages/NewGame';
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
          <Router history={browserHistory}>
              <Route component={App}>
                  <Route path="/" component={Home} />
                  <Route path="/games" component={Games} />
                  <Route path="/game/:id" component={Game} />
                  <Route path="/current" component={NewGame} />
              </Route>
          </Router>
      </MuiThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('react-container')
);
