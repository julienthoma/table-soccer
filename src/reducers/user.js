import * as actions from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        currentUser: action.user
      };

    default:
      return state;
  }
};
