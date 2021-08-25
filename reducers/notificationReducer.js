import {FETCH_NOTIFICATIONS, POST_FEEDBACK} from '../actions/types';

const initialState = {
  notifications: {},
  feedback: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case POST_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
      };

    default:
      return state;
  }
}
