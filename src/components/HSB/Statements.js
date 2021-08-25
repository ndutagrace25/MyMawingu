import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {appIcon, ellipsis} from '../../images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Menu} from '../common';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchStatement} from '../../../actions/statementActions';
import {connect} from 'react-redux';
import moment from 'moment';

class Statements extends Component {
  state = {
    start_date: '',
    end_date: '',
    customer_no: '',
    statements: [],
    showPreloader: false,
  };

  componentDidMount() {
    // fetch customer details from async storage
    AsyncStorage.getItem('CustomerAccountDetails').then((value) => {
      if (value === null || value === false) {
        this.props.navigation.navigate('HSBLogin', {Authenticated: false});
      } else {
        this.setState({
          customer_no: JSON.parse(value).id,
        });
      }
    });
  }

  backToHome = () => {
    this.props.navigation.navigate('Landing');
  };

  // set date to selected date
  onDateChange = (date) => {
    this.setState({start_date: date, end_date: '', statements: []});
  };
  // set date to selected date
  onDateChangeEndDate = (date) => {
    const {start_date, customer_no} = this.state;
    if (start_date === '') {
      alert('Kindly pick from which date first');
    } else {
      this.setState({end_date: date});
      let data = {
        start_date,
        customer_no,
        end_date: date,
        showPreloader: true,
      };
      this.props.fetchStatement(data);
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.statements !== state.statements) {
      return {
        statements: props.statements,
        showPreloader: false
      };
    }
    return null;
  }

  render() {
    const {start_date, end_date, statements, showPreloader} = this.state;

    const displayStatements =
      statements instanceof Array
        ? statements.map((statement) => (
            <View key={statement.id} style={styles.oneNotification}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Image source={appIcon} style={styles.logo} />
                <Text>
                  Date: {moment(statement.posting_date).format('DD/MM/yyyy')}
                </Text>
              </View>
              <View style={styles.stateMentCard}>
                <Text style={styles.amountText}>
                  Entry No: {statement.entry_no}
                </Text>
                <Text style={styles.amountText}>
                  Amount: Kes. {statement.original_amount}
                </Text>
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
            <Text style={styles.notificationText}>Statement</Text>
          </View>
        </View>
        {/* notifications */}
        <View style={styles.notificationCard}>
          <View style={styles.dateCard}>
            <View style={styles.dateItem}>
              <Text style={styles.dateText}>From</Text>
              <DatePicker
                style={styles.datePicker}
                date={start_date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={(date) => {
                  this.onDateChange(date);
                }}
              />
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateText}>To</Text>
              <DatePicker
                style={styles.datePicker}
                date={end_date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={(date) => {
                  this.onDateChangeEndDate(date);
                }}
              />
            </View>
          </View>
          <View>{showPreloader && <ActivityIndicator color="#0000ff" />}</View>
          {start_date !== '' && end_date !== '' && (
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Text style={{fontWeight: 'bold'}}>
                Statement as from {start_date} to {end_date}
              </Text>
            </View>
          )}

          <ScrollView style={{marginBottom: 60}}>
            {displayStatements}
          </ScrollView>
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
  dateText: {
    marginBottom: 5,
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
  stateMentCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  amountText: {
    fontStyle: 'normal',
    fontFamily: 'Montserrat',
  },
  notificationText: {
    color: '#fff',
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
  dateCard: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  dateItem: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  statements: state.statements.statements,
});

export default connect(mapStateToProps, {fetchStatement})(Statements);
