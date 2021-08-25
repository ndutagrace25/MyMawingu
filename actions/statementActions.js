import {axios, createError} from '../utils';

import {FETCH_STATEMENTS} from './types';

export const fetchStatement = (data) => (dispatch) => {
  let url = `https://mymawingu-app-backend.mawingunetworks.com/statements?customer_no=${data.customer_no}&start_date=${data.start_date}&end_date=${data.end_date}`;
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: FETCH_STATEMENTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error.response.data);
      createError(error);
    });
};
