import { SET_TEXT } from '../actions/ExampleActions';

export default (state, action) => {
  switch(action.type) {
    case SET_TEXT:
      return Object.assign({}, state, {
        text: action.payload.text
      });

    default:
      return state;
  }
}
