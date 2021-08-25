import React from 'react';
import {View, Dimensions} from 'react-native';
import {Bars} from 'react-native-loader';
// import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const Loader = () => {
  return (
    <View style={styles.container}>
      <Bars size={10} color="#ffffff" />
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    zIndex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: '#F4B334',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Loader;
