import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import reducer from './reducers';
import { enhanceStore, getInitialState } from './store';
import App from './containers/App';
import Games from './pages/Games';
import Players from './pages/Players';
import Player from './pages/Player';
import Game from './pages/Game';
import GameCreator from './pages/GameCreator';
import Comparinator from './pages/Comparinator';

import './index.scss';

injectTapEventPlugin();
addLocaleData(de);

render(
  <Provider store={enhanceStore(reducer, getInitialState())}>
    <IntlProvider locale={'de'}>
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route component={App}>
            <Route path="/" component={Games} />
            <Route path="/games" component={Games} />
            <Route path="/game/:id" component={Game} />
            <Route path="/players" component={Players} />
            <Route path="/player/:id" component={Player} />
            <Route path="/new" component={GameCreator} />
            <Route path="/compare/:p1/:p2" component={Comparinator} />
          </Route>
        </Router>
      </MuiThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('react-container')
);
