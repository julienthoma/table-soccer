import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ThemeProvider } from 'emotion-theming';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import reducer from './reducers';
import { enhanceStore, getInitialState } from './store';
import App from './containers/App';
import Games from './pages/Games';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Player from './pages/Player';
import theme from './style/theme';
import Game from './pages/Game';
import GameCreator from './pages/GameCreator';
import Comparinator from './pages/Comparinator';
import './index.scss';

addLocaleData(de);

render(
  <Provider store={enhanceStore(reducer, getInitialState())}>
    <IntlProvider locale="de">
      <MuiThemeProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div>
              <App>
                <Switch>
                  <Route exact path="/" component={Games} />
                  <Route exact path="/games" component={Games} />
                  <Route exact path="/teams" component={Teams} />
                  <Route path="/game/:id" component={Game} />
                  <Route exact path="/players" component={Players} />
                  <Route path="/player/:id" component={Player} />
                  <Route exact path="/new" component={GameCreator} />
                  <Route path="/compare/:p1/:p2" component={Comparinator} />
                </Switch>
              </App>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
