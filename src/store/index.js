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
  },
  game: {
    players: [
      {
        name: 'Alex',
        id: 'aku',
        index: 0
      },
      {
        name: 'Christian',
        id: 'chr',
        index: 1
      },
      {
        name: ' Christopher',
        id: 'cku',
        index: 2
      },
      {
        name: 'Eugen',
        id: 'ema',
        index: 3
      }
    ],
    startdate: 1497778699457,
    activeStep: 'ACTIVE_GAME_STEP',
    scoreTimeline: [],
    isFinished: false,
    score: [0, 0, 0, 0, 0, 0, 0, 0]
  }
});
