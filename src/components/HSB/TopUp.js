import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

class TopUp extends Component {
  state = {};
  render() {
    const {accountNumber, phone, amount} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.payBill}>
          {/* <Text>
            Top Up via STK below or Paybill 123456
          </Text> */}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Top Up (Account: {accountNumber}) </Text>
          <Text style={styles.mpesa}>
            You can use 579950 as the paybill number and {accountNumber} as
            account number in your MPESA or enter the details below..
          </Text>
          
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            textAlignVertical={'center'}
            // secureTextEntry={true}
            keyboardType="number-pad"
            onChangeText={this.props.handlePhoneChange}
            value={phone}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Amount</Text>
          <TextInput
            style={styles.input}
            textAlignVertical={'center'}
            // secureTextEntry={true}
            keyboardType="number-pad"
            onChangeText={(text) => this.props.handleAmountChange(text)}
            value={amount}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.props.topUp}>
          <Text style={styles.btnLabel}>SUBMIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.props.openModal}>
          <Text style={styles.btnLabelClose}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    paddingBottom: 20,
    borderRadius: 3,
  },
  payBill: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  titleContainer: {
    width: responsiveWidth(100),
    marginTop: responsiveHeight(2),
    alignSelf: 'center',
    paddingHorizontal: 25,
  },
  title: {
    // color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
  inputContainer: {
    width: responsiveWidth(80),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: responsiveHeight(3),
  },
  inputLabel: {
    // color: '#fff',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  input: {
    width: responsiveWidth(80),
    height: responsiveHeight(6.4),
    marginTop: responsiveHeight(0.4),
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    borderColor: '#F4B334',
    borderWidth: 1,
    borderRadius: 4,
    color: '#0D47A1',
    paddingLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(2.4),
    padding: 0,
    margin: 0,
  },
  button: {
    width: responsiveWidth(80),
    height: responsiveHeight(6.4),
    backgroundColor: '#F4B334',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: responsiveHeight(4),
  },
  closeButton: {
    width: responsiveWidth(22),
    height: responsiveHeight(4.4),
    backgroundColor: '#0971CE',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: responsiveHeight(4),
    borderRadius: 2,
  },
  btnLabel: {
    textAlign: 'center',
    color: '#fff',
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
  },
  btnLabelClose: {
    textAlign: 'center',
    color: '#fff',
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
  },
  mpesa: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: responsiveFontSize(1.4),
  },
});
export default TopUp;
