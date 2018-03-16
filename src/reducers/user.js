import * as actions from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        currentUser: action.user,
        isAuthorizing: false
      };

    case actions.LOGIN:
      return {
        ...state,
        isAuthorizing: true
      };

    default:
      return state;
  }
};
