import React, { Component } from "react";

import { Alert, StyleSheet } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Communications from "react-native-communications";
import AsyncStorage from "@react-native-community/async-storage";
import { showMessage } from "react-native-flash-message";
import { phone, back } from "../../images";

class Menu extends Component {
  state = {
    buttonActions: [
      {
        text: "Call Us",
        icon: require("../../images/phone-symbol.png"),
        name: "bt_call",
        position: 1,
        color: "#2196F3",
      },

      {
        text: "WhatsApp Us",
        icon: require("../../images/whatsapp-icon.png"),
        name: "bt_whatsapp",
        position: 2,
        color: "#2196F3",
      },
      {
        text: "Facebook Us",
        icon: require("../../images/facebook-logo.png"),
        name: "bt_fb",
        position: 3,
        color: "#2196F3",
      },
      {
        text: "Tweet Us",
        icon: require("../../images/twitter-icon.png"),
        name: "bt_twitter",
        position: 4,
        color: "#2196F3",
      },
      {
        text: "FAQ",
        icon: require("../../images/FAQ-icon.png"),
        name: "bt_faq",
        position: 5,
        color: "#2196F3",
      },
      {
        text: "Logout",
        icon: back,
        name: "logout",
        position: 6,
        color: "#2196F3",
      },
    ],
  };

  logOut = () => {
    console.log("Its getting here");
    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const removeCustomer = async (key) => {
              try {
                await AsyncStorage.removeItem(key);
                showMessage({
                  message: "Logout!",
                  description: "Logged out successfully",
                  type: "success",
                  icon: "success",
                  duration: 20000,
                });
                this.props.navigation.navigate("HSBLogin");
              } catch (exception) {
                showMessage({
                  message: "Logout",
                  description: "Something went wrong, please try again",
                  type: "danger",
                  icon: "danger",
                  duration: 5000,
                });
              }
            };
            removeCustomer("customerDetails");
          },
        },
      ],
      { cancelable: false }
    );
  };
  render() {
    const { buttonActions } = this.state;
    const { navigate } = this.props;
    // console.log(this.props.navigate("HSBLogin"));
    return (
      <FloatingAction
        color="#2196F3"
        distanceToEdge={15}
        actions={buttonActions}
        style={styles.menu}
        floatingIcon={phone}
        iconHeight={30}
        iconWidth={30}
        onPressItem={(name) => {
          if (name === "bt_call") {
            Communications.phonecall("0702100500", true);
          } else if (name === "bt_whatsapp") {
            Communications.web("https://wa.me/+254702100500");
          } else if (name === "bt_fb") {
            Communications.web("https://www.facebook.com/MawinguNetworksLtd");
          } else if (name === "bt_twitter") {
            Communications.web("https://twitter.com/mawingunetworks?lang=en");
          } else if (name === "bt_faq") {
            Communications.web("https://www.mawingunetworks.com/faq.html");
          } else if (name === "logout") {
            Alert.alert(
              "Logout",
              "Are you sure?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    AsyncStorage.removeItem("CustomerAccountDetails").then(
                      (value) => {
                        if (value === null || value === false) {
                          //  Actions.homeAndBusinessLogin();
                          navigate("HSBLogin", { Authenticated: false });
                        } else {
                          navigate("Landing");
                        }
                      }
                    );
                  },
                },
              ],
              { cancelable: false }
            );
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    elevation: 5,
  },
});

export default Menu;
