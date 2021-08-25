import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Welcome, HSBLogin} from './src/components/auth';
import {Landing, Notifications, Feedback, Statements} from './src/components/HSB';

const navigator = createStackNavigator(
  {
    Welcome: Welcome,
    HSBLogin: HSBLogin,
    Landing: Landing,
    Notifications: Notifications,
    Feedback: Feedback,
    Statements: Statements
  },
  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      title: 'MyMawingu',
      header: null,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(navigator);
