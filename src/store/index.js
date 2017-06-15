import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export const enhanceStore = (reducer, state) => {
  let enhancer = applyMiddleware(thunk);
  if (
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    enhancer = compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return createStore(reducer, state, enhancer);
};

export const getInitialState = config => ({
  config: {
    ...config
  },
  app: {
    initialized: false,
    infoText: null
  }
});
