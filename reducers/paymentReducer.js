import {TOP_UP, TOP_UP_ERROR} from '../actions/types';

const initialState = {
  topUpResponse: {},
  topUpError: {},
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOP_UP:
      return {
        ...state,
        topUpResponse: action.payload,
      };

    case TOP_UP_ERROR:
      return {
        ...state,
        topUpError: action.payload,
      };

    default:
      return state;
  }
}
