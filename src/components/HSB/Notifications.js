import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchNotifications} from '../../../actions/notificationActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appIcon, ellipsis} from '../../images';
import {Menu} from '../common';
import moment from 'moment';

class Notifications extends Component {
  state = {
    notifications: [],
  };

  componentDidMount() {
    this.props.fetchNotifications();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.notifications !== state.notifications) {
      return {
        notifications: props.notifications,
      };
    }

    return null;
  }

  backToHome = () => {
    this.props.navigation.navigate('Landing');
  };

  render() {
    const {notifications} = this.state;
    console.log(notifications);

    const displayNotifications =
      notifications instanceof Array
        ? notifications.map((notification) => (
            <View key={notification.id} style={styles.oneNotification}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image source={appIcon} style={styles.logo} />
                <Text>
                  {moment(notification.createdAt).format('DD/MM/yyyy')}
                </Text>
              </View>
              <View style={styles.notificationText}>
                <Text>{notification.text}</Text>
              </View>
            </View>
          ))
        : null;

    return (
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <View style={styles.logoCard}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={this.backToHome}>
              <Image source={ellipsis} style={styles.elips} />
              <Text style={styles.headerText}>Back to Homepage</Text>
            </TouchableOpacity>
            <Image source={appIcon} style={styles.logoHeader} />
          </View>
          <View style={styles.logoCardText}>
            <Text style={styles.notificationText}>Notifications</Text>
          </View>
        </View>
        {/* notifications */}
        <View style={styles.notificationCard}>{displayNotifications}</View>
        <Menu />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0971CE',
  },
  header: {
    height: hp(20),
  },
  logoCard: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoCardText: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    // alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 2,
  },
  logoHeader: {
    height: 60,
    width: 60,
  },
  notificationCard: {
    borderTopLeftRadius: 30,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 15,
    flex: 1,
  },
  notificationText: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontFamily: 'Montserrat',
  },
  elips: {
    height: 17,
    width: 17,
    marginRight: 2,
  },
  oneNotification: {
    borderBottomColor: '#000000',
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    paddingVertical: 13,
    paddingHorizontal: 10,
    // flexWrap: 'wrap'
    // justifyContent: 'space-between'
  },
});

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications.items,
});

export default connect(mapStateToProps, {fetchNotifications})(Notifications);
