import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  ScrollView,
} from 'react-native';
import {Menu} from '../common';
import AsyncStorage from '@react-native-community/async-storage';
import {loginHomeAndBusiness} from '../../../actions/authActions';
import {topUp} from '../../../actions/paymentActions';
import {connect} from 'react-redux';
import {TopUp} from './';
import Modal from 'react-native-modal';

import {
  header,
  appIcon,
  pay,
  invoice,
  notification,
  wifiPassword,
  feedback,
  installation,
} from '../../images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Landing extends Component {
  state = {
    customerDetails: {},
    customerBalance: {},
    showModal: false,
    phone: '',
    amount: '',
  };

  openModal = () => {
    const {showModal} = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  topUp = () => {
    const {phone, amount, customerDetails} = this.state;
    if (phone === '' || amount === '') {
      alert('Phone and Amount are required!');
    } else {
      let data = {
        phone,
        amount: parseInt(amount),
        accountno: customerDetails.id,
      };
      this.props.topUp(data, customerDetails.id);
      this.setState({
        phone: '',
        amount: '',
      });
      this.openModal();
    }
  };

  handlePhoneChange = (phone) => {
    this.setState({phone});
  };

  handleAmountChange = (amount) => {
    this.setState({amount});
  };

  componentDidMount() {
    // fetch customer details from async storage
    AsyncStorage.getItem('CustomerAccountDetails').then((value) => {
      if (value === null || value === false) {
        this.props.navigation.navigate('HSBLogin', {Authenticated: false});
      } else {
        // check current version if not latest, logout the user
        if (JSON.parse(value).version !== 1) {
          AsyncStorage.removeItem('CustomerAccountDetails').then((value) => {
            if (value === null || value === false) {
              this.props.navigation.navigate('HSBLogin', {
                Authenticated: false,
              });
            }
          });
        } else {
          this.setState({
            customerDetails: JSON.parse(value),
            amount: JSON.parse(value).customer_balance,
          });

          this.props.loginHomeAndBusiness({customer: JSON.parse(value).id});
        }
      }
    });

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.updateTimer = setInterval(
      () =>
        this.props.loginHomeAndBusiness({
          customer: this.state.customerDetails.id,
        }),
      120000,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    clearInterval(this.updateTimer);
  }

  handleBackButton() {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.customerBalance !== state.customerBalance) {
      return {
        customerBalance: props.customerBalance.customer_balance,
      };
    }
    return null;
  }

  commingSoon = () => {
    alert('Coming soon');
  };

  viewNotifications = () => {
    this.props.navigation.navigate('Notifications');
  };
  goToFeedback = () => {
    this.props.navigation.navigate('Feedback');
  };

  goToStatements = () => {
    this.props.navigation.navigate('Statements');
  };

  render() {
    const {
      customerDetails,
      customerBalance,
      showModal,
      phone,
      amount,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.logoCard}>
          <Image source={appIcon} style={styles.logo} />
          <Text style={styles.companyName}>Mawingu Network</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={header} style={styles.image} />
          <Text
            style={
              styles.welcomeText
            }>{`Welcome ${customerDetails.customer_name} to your mawingu account`}</Text>
        </View>
        {/* current package */}
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.currentPackage}>
              <View style={styles.headingCard}>
                <Text style={styles.heading}>Account Details</Text>
              </View>

              <View style={styles.packageDetails}>
                <View style={styles.card}>
                  <Text style={styles.title}>Name</Text>
                  <Text style={styles.text}>
                    {customerDetails.customer_name}
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.title}>Number</Text>
                  <Text style={styles.text}>{customerDetails.id}</Text>
                </View>
                <View style={styles.lastCard}>
                  <Text style={styles.title}>Balance</Text>
                  <Text style={styles.text}>{`Kes. ${customerBalance}`}</Text>
                </View>
              </View>
            </View>
            <View style={styles.actions}>
              <View style={styles.actionsTitle}>
                <Text style={styles.heading}>Quick Actions</Text>
              </View>
              <View style={styles.actionCotainer}>
                <TouchableOpacity
                  style={styles.actionCard}
                  onPress={this.openModal}>
                  <Image source={pay} style={styles.actionImage} />
                  <Text style={styles.actionText}>Pay</Text>
                  <View>
                    <Modal isVisible={showModal}>
                      <View style={{flex: 1}}>
                        <TopUp
                          openModal={this.openModal}
                          accountNumber={customerDetails.id}
                          topUp={this.topUp}
                          handleAmountChange={this.handleAmountChange}
                          handlePhoneChange={this.handlePhoneChange}
                          phone={phone}
                          amount={amount}
                        />
                      </View>
                    </Modal>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionCard}
                  onPress={this.goToStatements}>
                  <Image source={invoice} style={styles.actionImage} />
                  <Text style={styles.actionText}>Statement</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionCard}
                  onPress={this.commingSoon}>
                  <Image source={notification} style={styles.actionImage} />
                  <Text style={styles.actionText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionCard}
                  onPress={this.commingSoon}>
                  <Image source={wifiPassword} style={styles.actionImage} />
                  <Text style={styles.actionText}>Change Wi-Fi Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionCard}
                  onPress={this.goToFeedback}>
                  <Image source={feedback} style={styles.actionImage} />
                  <Text style={styles.actionText}>Give Your Feedback</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <Menu navigate={this.props.navigation.navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    zIndex: 1,
  },
  image: {
    height: hp('20%'),
    width: wp('100%'),
  },
  content: {elevation: 0, flex: 1},
  companyName: {
    fontWeight: 'bold',
    color: '#e0e0e0',
    fontSize: hp('1.8%'),
    fontFamily: 'Cochin',
  },
  imageContainer: {
    shadowColor: 'gray',
  },
  logoCard: {
    padding: 5,
    backgroundColor: '#0971CE',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 30,
  },
  welcomeText: {
    // position: "absolute",
    textTransform: 'capitalize',
    fontSize: hp('1.6%'),
    marginLeft: 8,
    marginTop: 2,
    fontWeight: 'bold',
  },
  actionImage: {
    height: 25,
    width: 25,
  },

  currentPackage: {
    margin: 8,
  },
  headingCard: {
    marginVertical: 3,
    marginHorizontal: 8,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: hp('1.9%'),
    fontFamily: 'Cochin',
    color: '#9e9e9e',
  },
  packageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#fb9800',
    padding: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#bdbdbd',
    borderRightWidth: 0.8,
    padding: 5,
    paddingVertical: 10,
  },
  lastCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    fontSize: hp('1.5%'),
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#ffffff',
  },
  title: {
    fontSize: hp('1.6%'),
    fontFamily: 'Cochin',
    color: '#ffffff',
  },
  actions: {
    borderRadius: 5,
    backgroundColor: '#ffffff',
    // padding: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    marginHorizontal: 8,
    paddingBottom: 23,
  },
  actionsTitle: {
    marginLeft: 8,
    marginVertical: 5,
  },
  actionText: {
    fontFamily: 'Cochin',
    fontSize: hp('1.8%'),
    marginTop: 5,
    color: '#ffffff',
  },
  actionCotainer: {
    // justifyContent: "space-between",
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 0,
    justifyContent: 'center',
    marginBottom: 5,
  },
  actionCard: {
    width: wp('39%'),
    height: hp('14%'),
    // borderWidth: 0.8,
    // borderColor: "#bdbdbd",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#57b0e3',
    margin: 3,
    borderRadius: 5,
  },
  //   menu: {   marginTop: 80 },
});

const mapStateToProps = (state) => ({
  customerBalance: state.auth.customerDetails,
});

export default connect(mapStateToProps, {loginHomeAndBusiness, topUp})(Landing);
