import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";

import globalStyles, {
  colorSchema,
  screenHeight,
  screenWidth,
  getSize
} from "common/src/styles";
import {
  imageSources,
  imagesSrc,
  sgLogoSize,
  wlLogoSize,
  booksSize
} from "common/src/assets/images";
import BaseScreen from "common/src/components/visual/BaseScreen";

const sgLogoRatio = 0.7;
const wlLogoRatio = 0.8;

const styles = StyleSheet.create({
  bgImage0: {
    position: "absolute",
    width: "100%",
    height: "100%",
    /*
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
*/
    resizeMode: "cover"
  },
  sgLogoContainer: {
    marginTop: screenHeight * 0.04,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "white",
    alignItems: "center"
  },
  wlLogoContainer: {
    alignItems: "center"
  },
  sgLogoImage: {
    width: "100%",
    height: (sgLogoSize[1] * screenWidth * sgLogoRatio) / sgLogoSize[0],
    resizeMode: "contain"
  },
  wlLogoImage: {
    width: "100%",
    height: (wlLogoSize[1] * screenWidth * wlLogoRatio) / wlLogoSize[0],
    resizeMode: "contain"
  },
  screen1Container: {
    flex: 1,
    width: "100%",
    paddingBottom: 20,
    justifyContent: "space-between"
  },
  h1Text: {
    color: "#F5BF3C",
    paddingBottom: getSize("TEXT", "LARGE")
  },
  text: {
    fontSize: getSize("TEXT", "LARGE"),
    color: "white"
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  booksImage: {
    width: "100%",
    height: (booksSize[1] * screenWidth) / booksSize[0],
    resizeMode: "contain"
  }
});

export default class Splash extends BaseScreen {
  bgColors = ["#003265", "#F4E8D5"];
  constructor(props) {
    super(props);
    this.state = { srcIndex: 0 };
    setTimeout(() => {
      this.setState({ srcIndex: 1 });
    }, 2000);
  }

  render() {
    //console.log("imageSources=", imageSources);
    return (
      <View style={[globalStyles.screen, { paddingTop: 0 }]}>
        <Image source={imagesSrc.bgImage0} style={styles.bgImage0} />
        <View style={{ flex: 1, width: "100%", paddingTop: 0 }}>
          <View style={styles.sgLogoContainer}>
            <Image source={imagesSrc.sgLogoImage} style={styles.sgLogoImage} />
          </View>
          {this.state.srcIndex == 0 && (
            <View style={styles.textContainer}>
              <Text style={[globalStyles.h1Text, styles.h1Text]}>
                ПРЕДСТАВЛЯЕТ
              </Text>
              <Text style={styles.text}>новую игру</Text>
            </View>
          )}
          {this.state.srcIndex == 1 && (
            <View style={styles.screen1Container}>
              <View />
              <View style={styles.wlLogoContainer}>
                <Image
                  source={imagesSrc.wlLogoImage}
                  style={styles.wlLogoImage}
                />
              </View>
              <Image source={imagesSrc.booksImage} style={styles.booksImage} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

Splash.navigationOptions = {
  title: "Splash"
};
