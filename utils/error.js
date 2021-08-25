import {showMessage} from 'react-native-flash-message';

const createError = err => {
  const message = err.message;

  if (err.response) {
    console.log(err.response);
    if (err.response.data) {
      if (err.response.data.error) {
        return err.response.data.error;
      }
    }
  }

  return message;
};

export default createError;
