import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Logo } from "../common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";

class Welcome extends Component {
  state = {};
  goToLogin = () => {
    this.props.navigation.navigate("HSBLogin", { Authenticated: null });
  };

  componentDidMount() {
    AsyncStorage.getItem("CustomerAccountDetails").then((value) => {
      if (value === null || value === false) {
        //  Actions.homeAndBusinessLogin();
        // this.props.navigation.navigate("HSBLogin");
      } else {
        this.props.navigation.navigate("Landing");
      }
    });
  }

  render() {
    return (
      <View style={styles.imgBackground}>
        <Logo />
        <TouchableOpacity style={styles.button} onPress={this.goToLogin}>
          <Text style={styles.btnLabel}>Home and Business</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnLabel}>HotSpot</Text>
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
});

export default Welcome;
