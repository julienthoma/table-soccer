import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import prodConfig from '../../config.json';
import devConfig from '../../config-dev.json';

const env = process.env.NODE_ENV;

export const enhanceStore = (reducer, state) => {
  let enhancer = applyMiddleware(thunk);
  if (env !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancer = compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return createStore(reducer, state, enhancer);
};

export const getInitialState = () => {
  const config = env === 'production' ? prodConfig : devConfig;

  return {
    config: {
      ...config
    },
    app: {
      initialized: false,
      infoText: null,
      prefetchDone: false
    },
    user: {
      isAuthorizing: true
    }
  };
};
