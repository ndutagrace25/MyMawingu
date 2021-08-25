import {axios, createError} from '../utils';
import {showMessage} from 'react-native-flash-message';

import {TOP_UP, TOP_UP_ERROR} from './types';

export const topUp = (payment, account) => (dispatch) => {
  let url = `https://mymawingu-app-backend.mawingunetworks.com/payments/buystk`;
  console.log(payment);
  axios
    .post(url, payment)
    .then((response) => {
      dispatch({
        type: TOP_UP,
        payload: response.data,
      });
      showMessage({
        message: 'Payment',
        description: response.data.message,
        type: 'success',
        icon: 'success',
        duration: 10000,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: TOP_UP_ERROR,
        payload: {
          error: createError(err),
        },
      });
      if (err) {
        if (typeof err.response.data.error === 'string') {
          showMessage({
            message: 'Paymennt Error!',
            description:
              'Kindly input a valid mpesa phone number or use 579950 Paybill no and ' +
              account +
              ' as account number in your mpesa.',
            type: 'danger',
            icon: 'danger',
            duration: 30000,
          });
        } else if (Object.keys(err.response.data).length === 0 || err.message) {
          alert('Sorry, something went wrong');
        }
      }
    });
};
