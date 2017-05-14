import * as actions from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.TOGGLE_SNACKBAR:
      return {
        ...state,
        infoText: action.infoText,
        actionText: action.actionText,
        callbackFn: action.callbackFn
      };

    default:
      return state;
  }
};
