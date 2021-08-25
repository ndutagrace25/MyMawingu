import {axios, createError} from '../utils';

import {FETCH_NOTIFICATIONS, POST_FEEDBACK} from './types';
import {showMessage} from 'react-native-flash-message';

export const fetchNotifications = () => (dispatch) => {
  let url = `https://api-mysql.mawingunetworks.com/announcements`;
  axios
    .get(url)
    .then((response) => {
      dispatch({
        type: FETCH_NOTIFICATIONS,
        payload: response.data,
      });
    })
    .catch((error) => {
      createError(error);
    });
};
export const saveFeedback = (details) => (dispatch) => {
  let url = `https://mymawingu-app-backend.mawingunetworks.com/feedback`;
  axios
    .post(url, details)
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: POST_FEEDBACK,
        payload: response.data,
      });
      showMessage({
        message: 'Feedback',
        description: 'Thank you for your feedback',
        type: 'success',
        icon: 'success',
        duration: 10000,
      });
    })
    .catch((error) => {
      createError(error);
    });
};
