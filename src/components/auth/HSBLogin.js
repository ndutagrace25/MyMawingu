import React, { Component } from "react";
import { showMessage } from "react-native-flash-message";
import { isOnline } from "../../../utils";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Logo, Loader } from "../common";
import { loginHomeAndBusiness } from "../../../actions/authActions";
import AsyncStorage from "@react-native-community/async-storage";

class HSBLogin extends Component {
  state = {
    customer: "",
    loader: false,
    isAuthenticated: false,
    errors: {},
  };

  static getDerivedStateFromProps(props, state) {
    console.log(props.navigation);
    if (props.auth.isAuthenticated !== state.isAuthenticated) {
      if (
        props.isAuthenticated ||
        props.navigation.state.params.Authenticated === false
      ) {
        return {
          loader: false,
        };
      }
    }

    if (Object.keys(props.errors).length !== 0) {
      return {
        loader: false,
      };
    }

    return null;
  }

  componentDidMount() {
    // const { navigation } = this.props;
    // console.log(navigation);
    console.log(this.props.navigation);
    isOnline((err, state) => {
      if (err) {
        console.log(err);
        showMessage({
          message: "You are offline",
          description: "Turn on your WI-FI or Data To Proceed",
          type: "danger",
          icon: "danger",
          duration: 5000,
        });
      } else {
        if (state) {
          // console.log(state);
        }
      }
    });
    AsyncStorage.getItem("CustomerAccountDetails").then((value) => {
      if (value === null || value === false) {
        //  Actions.homeAndBusinessLogin();
        // this.props.navigation.navigate("HSBLogin");
      } else {
        this.props.navigation.navigate("Landing");
      }
    });
  }

  componentDidUpdate() {
    console.log(this.props.navigation);
    // this.setState({
    //   loader: false,
    // });
  }

  handlePhoneChange = (customer) => {
    this.setState({ customer });
  };

  backToWelcome = () => {
    this.props.navigation.navigate("Welcome");
  };

  login = () => {
    const { customer } = this.state;

    if (customer === "") {
      this.showError("Login Error", "Account number is required");
    } else {
      //   this.setState({ isLoading: true });
      const user = {
        customer: customer,
      };

      this.props.loginHomeAndBusiness(user, this.props.navigation.replace);
      this.setState({
        customer: "",
        loader: true,
      });
    }
  };

  showError = (title, message) => {
    showMessage({
      message: title,
      description: message,
      type: "danger",
      icon: "danger",
      duration: 5000,
    });
  };

  render() {
    const { customer, loader } = this.state;
    return (
      <View style={styles.imgBackground}>
        {loader && <Loader />}
        <Logo />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SIGN IN</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Account Number</Text>
          <TextInput
            style={styles.input}
            textAlignVertical={"center"}
            keyboardType="visible-password"
            onChangeText={this.handlePhoneChange}
            value={customer}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={styles.btnLabel}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={this.backToWelcome}
        >
          <Text style={styles.link}>Back to home page</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "#0971CE",
    justifyContent: "center",
  },
  titleContainer: {
    width: wp("100%"),
  },
  title: {
    color: "#fff",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: hp("5%"),
    textAlign: "center",
  },
  inputContainer: {
    width: wp("80%"),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: hp("4%"),
  },
  subTitle: {
    color: "#F4B334",
    fontSize: hp("1.8%"),
    fontFamily: "Roboto",
    textAlign: "center",
  },
  inputLabel: {
    color: "#fff",
    fontSize: hp("1.4%"),
    fontFamily: "Roboto",
    textAlign: "left",
  },
  input: {
    width: wp("80%"),
    height: hp("6.4%"),
    marginTop: hp("0.4%"),
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#fff",
    borderColor: "#F4B334",
    borderWidth: 1,
    borderRadius: 4,
    color: "#0D47A1",
    paddingLeft: wp("2%"),
    fontSize: hp("2.4%"),
    padding: 0,
    margin: 0,
  },
  button: {
    width: wp("80%"),
    height: hp("6.4%"),
    backgroundColor: "#F4B334",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: hp("4%"),
  },
  btnLabel: {
    textAlign: "center",
    color: "#fff",
    fontSize: hp("2.6%"),
    fontWeight: "bold",
  },
  linkContainer: {
    width: wp("80%"),
    marginTop: hp("4%"),
    marginLeft: "auto",
    marginRight: "auto",
  },
  link: {
    color: "#F4B334",
    fontSize: hp("1.4"),
    fontFamily: "Roboto",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth.customerDetails,
  errors: state.auth.authErrorsHandB,
});

export default connect(mapStateToProps, { loginHomeAndBusiness })(HSBLogin);
