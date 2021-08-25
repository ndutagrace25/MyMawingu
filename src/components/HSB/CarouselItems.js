import React, { Component } from "react";

import { SafeAreaView, View, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

class CarouselItems extends Component {
  state = {
    carouselItems: [
      {
        title: "Item 1",
        text: "Text 1",
      },
      {
        title: "Item 2",
        text: "Text 2",
      },
      {
        title: "Item 3",
        text: "Text 3",
      },
      {
        title: "Item 4",
        text: "Text 4",
      },
      {
        title: "Item 5",
        text: "Text 5",
      },
    ],
  };

  _renderItem({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: "red",
          borderRadius: 5,
          height: hp("20%"),
          padding: 50,
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "rebeccapurple",
          paddingTop: 5,
          justifyContent: "center",
          alignContent: 'center'
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default CarouselItems;
