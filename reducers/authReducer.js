import {
  HOME_AND_BUSINESS_LOGIN,
  HOME_AND_BUSINESS_LOGIN_ERROR,
} from "../actions/types";

const initialState = {
  customerDetails: {},
  authErrorsHandB: {},
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HOME_AND_BUSINESS_LOGIN:
      return {
        ...state,
        customerDetails: action.payload,
        isAuthenticated: action.isAuthenticated,
      };

    case HOME_AND_BUSINESS_LOGIN_ERROR:
      return {
        ...state,
        authErrorsHandB: action.payload,
      };

    default:
      return state;
  }
}
