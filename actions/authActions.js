import {axios, createError, setAuthToken} from '../utils';
import AsyncStorage from '@react-native-community/async-storage';
import {showMessage} from 'react-native-flash-message';

import {HOME_AND_BUSINESS_LOGIN, HOME_AND_BUSINESS_LOGIN_ERROR} from './types';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const loginHomeAndBusiness = (customer, navigate) => (dispatch) => {
  let base_url = `https://mymawingu-app-backend.mawingunetworks.com/`;

  let url = `customers/login`;
  // alert('Hello')

  axios({
    transformRequest: [
      (data, headers) => {
        delete headers.common.Authorization;
        return data;
      },
    ],
    method: 'post',
    baseURL: base_url,
    url,
    data: JSON.stringify(customer),
    headers,
  })
    .then((res) => {
      AsyncStorage.setItem(
        'CustomerAccountDetails',
        JSON.stringify({...res.data, version: 1}),
      );
      // AsyncStorage.setItem("version", 2);

      dispatch({
        type: HOME_AND_BUSINESS_LOGIN,
        payload: res.data,
        isAuthenticated: true,
      });
      navigate('Landing', {Authenticated: true});

      showMessage({
        message: 'Login',
        description: 'Welcome!',
        type: 'success',
        icon: 'success',
        duration: 3000,
      });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: HOME_AND_BUSINESS_LOGIN_ERROR,
        payload: {
          error: createError(err),
        },
      });
      if (err) {
        if (typeof err.response.data.error === 'string') {
          showMessage({
            message: 'LOGIN ERROR!',
            description: err.response.data.error,
            type: 'danger',
            icon: 'danger',
            duration: 4000,
          });
        } else {
          if (err.message) {
            showMessage({
              message: 'LOGIN ERROR!',
              description: err.message.error,
              type: 'danger',
              icon: 'danger',
              duration: 5000,
            });
          }
        }
      }
    });
};
