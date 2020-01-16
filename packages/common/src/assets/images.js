import React from "react";
import { Platform, Image, View } from "react-native";
import { screenHeight, screenWidth } from "../styles";
import { colorSchema } from "../styles";

const imagesSrc = {
  booksImage: require("common/src/assets/images/books2.png"),
  bgImage0: require("common/src/assets/images/bg-blue-gradient.png"),
  girlImage: require("common/src/assets/images/girl1-01.png"),
  leftArrowImage: require("common/src/assets/images/leftArrow.png"),
  rightArrowImage: require("common/src/assets/images/rightArrow.png"),
  sgLogoImage: require("common/src/assets/images/logo2.png"),
  wlLogoImage: require("common/src/assets/images/wordline.png")
};

const imageSources = {};
for (const [key, source] of Object.entries(imagesSrc)) {
  if (Platform.OS === "web") {
    Image.getSize(source, (width, height) => {
      imageSources[key] = { source, width, height };
    });
  } else {
    const { width, height } = Image.resolveAssetSource(source);
    imageSources[key] = { source, width, height };
  }
}

const SpanielGamesLogoWithHeight = () => {
  const sgLogoRatio = 0.7;
  const imageSource = imageSources.sgLogoImage;
  const height = Math.floor(
    (imageSource.height * screenWidth * sgLogoRatio) / imageSource.width
  );
  const imageStyle = {
    width: "100%",
    height: height,
    resizeMode: "contain"
  };
  const containerStyle = {
    paddingTop: Math.floor(height * 0.26),
    paddingBottom: Math.floor(height * 0.13),
    backgroundColor: "white",
    alignItems: "center"
  };
  return {
    element: () => (
      <View style={containerStyle}>
        <Image source={imageSource.source} style={imageStyle} />
      </View>
    ),
    height: Math.floor(height * 1.39)
  };
};

const SpanielGamesLogo = () => {
  return SpanielGamesLogoWithHeight().element();
};

const TopSpanielGamesLogo = () => {
  const spanielGamesLogoWithHeight = SpanielGamesLogoWithHeight();
  const containerStyle = {
    width: "100%",
    backgroundColor: colorSchema.bg[2],
    paddingTop: 20,
    paddingBottom: 10,
    height: spanielGamesLogoWithHeight.height + 30
  };

  return (
    <View style={containerStyle}>
      <spanielGamesLogoWithHeight.element />
    </View>
  );
};

const sgLogoSize = [383, 70];
const wlLogoSize = [373, 80];
const booksSize = [1299, 565];

export {
  imageSources,
  SpanielGamesLogo,
  TopSpanielGamesLogo,
  imagesSrc,
  sgLogoSize,
  wlLogoSize,
  booksSize
};
