import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {saveFeedback} from '../../../actions/notificationActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appIcon, ellipsis, star, star_filled, star_half} from '../../images';
import {Menu} from '../common';
import moment from 'moment';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';

class Feedback extends Component {
  state = {
    notifications: [],
    starCount: 0,
    easyToUse: 0,
    satisfication: 0,
    correctAcount: 0,
    comment: '',
    user: '',
  };

  oneasyToUse(rating) {
    this.setState({
      easyToUse: rating,
    });
  }

  onsatisfication(rating) {
    this.setState({
      satisfication: rating,
    });
  }

  oncorrectAcount(rating) {
    this.setState({
      correctAcount: rating,
    });
  }

  componentDidMount() {
    AsyncStorage.getItem('CustomerAccountDetails').then((value) => {
      if (value === null || value === false) {
        this.props.navigation.navigate('HSBLogin', {Authenticated: false});
      } else {
        this.setState({
          user: JSON.parse(value).id,
        });
      }
    });
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

  handleCommentChange = (comment) => {
    this.setState({comment});
  };

  submit = () => {
    const {easyToUse, comment, user, satisfication, correctAcount} = this.state;

    let data = {
      easyToUse,
      comment,
      user,
      satisfication,
      correctAcount,
    };
    this.props.saveFeedback(data);
    this.setState({
      easyToUse: 0,
      comment: '',
      satisfication: 0,
      correctAcount: 0,
    });
    // console.log(data);
  };

  render() {
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
            <Text style={styles.notificationText}>Your Feedback</Text>
          </View>
        </View>
        {/* notifications */}
        <View style={styles.notificationCard}>
          <View style={styles.ratingCard}>
            <View style={styles.star}>
              <Text>How easy was it to use the app?</Text>
            </View>
            <StarRating
              disabled={false}
              emptyStar={star}
              fullStar={star_filled}
              halfStar={star_half}
              iconSet={'Ionicons'}
              maxStars={5}
              rating={this.state.easyToUse}
              selectedStar={(rating) => this.oneasyToUse(rating)}
              fullStarColor={'#FF9800'}
              starSize={20}
            />
          </View>
          <View style={styles.ratingCard}>
            <View style={styles.star}>
              <Text>
                How satisfied were you with the look and feel of the App?
              </Text>
            </View>
            <StarRating
              disabled={false}
              emptyStar={star}
              fullStar={star_filled}
              halfStar={star_half}
              iconSet={'Ionicons'}
              maxStars={5}
              rating={this.state.satisfication}
              selectedStar={(rating) => this.onsatisfication(rating)}
              fullStarColor={'#FF9800'}
              starSize={20}
            />
          </View>
          <View style={styles.ratingCard}>
            <View style={styles.star}>
              <Text>How accurate were your account details?</Text>
            </View>
            <StarRating
              disabled={false}
              emptyStar={star}
              fullStar={star_filled}
              halfStar={star_half}
              iconSet={'Ionicons'}
              maxStars={5}
              rating={this.state.correctAcount}
              selectedStar={(rating) => this.oncorrectAcount(rating)}
              fullStarColor={'#FF9800'}
              starSize={20}
            />
          </View>

          <View>
            <View>
              <Text></Text>
            </View>
            <TextInput
              // editable
              multiline
              maxLength={80}
              style={styles.input}
              placeholder="Please share more information about your ratings"
              onChangeText={this.handleCommentChange}
              value={this.state.comment}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text style={styles.btnLabel}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
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
    // borderTopLeftRadius: 30,
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
  input: {
    width: wp('90%'),
    height: hp('12.4%'),
    marginTop: hp('0.4%'),
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    borderColor: '#F4B334',
    borderWidth: 1,
    borderRadius: 4,
    color: '#0D47A1',
    paddingLeft: wp('2%'),
    fontSize: hp('2.4%'),
    padding: 0,
    margin: 0,
    flexWrap: 'wrap',
  },
  ratingCard: {
    marginHorizontal: 10,
  },
  star: {
    paddingVertical: 5,
  },
  button: {
    width: wp('80%'),
    height: hp('6.4%'),
    backgroundColor: '#0971CE',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: hp('4%'),
    borderRadius: 10,
  },
  btnLabel: {
    textAlign: 'center',
    color: '#fff',
    fontSize: hp('2.6%'),
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications.items,
});

export default connect(mapStateToProps, {saveFeedback})(Feedback);
