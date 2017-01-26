import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore } from 'redux';
import ExampleReducer from './reducers/ExampleReducer';
import App from './containers/App';

const store = createStore(
  ExampleReducer,
  {text: 'Hello World!'},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-container')
);