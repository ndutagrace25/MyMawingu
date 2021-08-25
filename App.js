import React, {Component, Fragment} from 'react';
import {View, Text} from 'react-native';
import {Welcome} from './src/components/auth';
import Router from './Routes';
import FlashMessage from 'react-native-flash-message';

class App extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Router />
        <FlashMessage position="top" />
      </Fragment>
    );
  }
}

export default App;
