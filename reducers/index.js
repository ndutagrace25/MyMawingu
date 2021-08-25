import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import paymentReducer from './paymentReducer';
import notificationReducer from './notificationReducer';
import statementReducer from './statementReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  topup: paymentReducer,
  notifications: notificationReducer,
  statements: statementReducer,
});
