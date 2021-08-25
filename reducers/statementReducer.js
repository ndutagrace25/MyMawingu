import {FETCH_STATEMENTS} from '../actions/types';

const initialState = {
  statements: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_STATEMENTS:
      return {
        ...state,
        statements: action.payload,
      };

    default:
      return state;
  }
}
