import * as React from "react";
import { View, Image, StyleSheet } from "react-native";
import { appLogo } from "../../images/";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

class Logo extends React.Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode={"contain"} source={appLogo} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp("19%"),
    width: wp("100%"),
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: hp("0%"),
    marginBottom: hp("5%"),
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
});

export default Logo;
