import { Platform, StyleSheet, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { fonts, defaultFont, getFontStyle } from "./fonts";
import { colorSchema } from "./schemes";

const getScreenWidth = () => {
  if (Platform.OS === "web") {
    return document.getElementById("root").offsetWidth;
  } else {
    return wp("100%");
  }
};
const screenWidth = getScreenWidth();
const screenHeight = hp("100%");
const WIDTH_SMALL = 375;
const WIDTH_LARGE = 768;
const sizeIndex =
  screenWidth <= WIDTH_SMALL ? 0 : screenWidth >= WIDTH_LARGE ? 2 : 1;

const h1TextSize = [24, 32, 48];
const h2TextSize = [20, 28, 40];
const textSize = [12, 16, 20];
const letterSize = [16, 20, 24];

const baseTextSize = textSize[sizeIndex];
const inputTextSize = baseTextSize * 1.5;
const textInputPadding = inputTextSize;

const rectButtonTextSize = [12, 16, 22];
const rectButtonPadding = [3, 6, 10];

const statusBarHeight = [27, 36, 45];
const getStatusBarHeight = () => {
  let height;
  if (Platform.OS === "android") {
    height = StatusBar.currentHeight;
  } else {
    height = statusBarHeight[sizeIndex];
  }
  return height;
};

const colorSchemes = [
  {
    bg: ["#F4E8D5", "#C4C4C4", "#003265", "#C1AF93"],
    hlink: ["#003265"],
    text: ["#606060", "#3A3631", "#F5BF3C", "#C5361E"]
  }
];
//const colorScheme = colorSchemes[0];

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: getStatusBarHeight(),
    borderWidth: 1,
    borderColor: colorSchema.bg[2]
  },
  text: {
    fontSize: textSize[sizeIndex],
    color: colorSchema.text[1],
    ...getFontStyle(defaultFont)
  },
  letter: {
    fontSize: textSize[sizeIndex],
    color: colorSchema.text[1]
    //...getFontStyle(defaultFont)
  },
  h1Text: {
    fontSize: h1TextSize[sizeIndex],
    color: colorSchema.text[1],
    ...getFontStyle(defaultFont, "bold"),
    paddingTop: h1TextSize[sizeIndex] / 2,
    paddingBottom: h1TextSize[sizeIndex] / 2
  },
  h2Text: {
    fontSize: h2TextSize[sizeIndex],
    color: colorSchema.text[1],
    ...getFontStyle(defaultFont, "bold"),
    paddingTop: h2TextSize[sizeIndex] / 2,
    paddingBottom: h2TextSize[sizeIndex] / 2
  },
  textLink: {
    fontSize: textSize[sizeIndex],
    color: colorSchema.hlink[0],
    ...getFontStyle(defaultFont)
  },
  textInput: {
    fontSize: inputTextSize,
    color: colorSchema.text[5],
    ...getFontStyle(defaultFont),
    backgroundColor: colorSchema.bg[5],
    //borderWidth: 1,
    //borderColor: colorSchema.text[0],
    //borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: textInputPadding,
    width: inputTextSize * 10
  },
  rectButtonText: {
    fontSize: rectButtonTextSize[sizeIndex],
    textAlign: "center",
    ...getFontStyle(defaultFont, "bold")
  },
  rectButtonContainer: {
    borderRadius: 2,
    paddingTop: rectButtonPadding[sizeIndex],
    paddingBottom: rectButtonPadding[sizeIndex],
    paddingLeft: rectButtonPadding[sizeIndex] * 4,
    paddingRight: rectButtonPadding[sizeIndex] * 4
  },
  navigationBar: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    //    paddingTop: rectButtonPadding[sizeIndex],
    //    paddingBottom: rectButtonPadding[sizeIndex],
    backgroundColor: colorSchema.bg[2],
    alignSelf: "stretch",
    //    flex: 0,
    flexDirection: "row",
    padding: 2
  },
  navigationButton: {
    backgroundColor: colorSchema.stateMessageBg[3],
    color: colorSchema[2]
  }
});

const getSize = (type, size) => {
  switch (type) {
    case "TEXT":
      return getTextSize(size);
    case "H1TEXT":
      return h1TextSize[sizeIndex] * (size == "LARGE" ? 2 : 1);
    default:
      throw new Error("globalStyles getSize() invalid type=" + type);
  }
};

const getTextSize = size => {
  switch (size) {
    case "LARGE":
      return baseTextSize * 2;
    case "MEDIUM":
      return Math.floor(baseTextSize * 1.5);
    case "SMALL":
    default:
      return baseTextSize;
  }
};

const getLetterSize = () => {
  return letterSize[sizeIndex];
};

export default styles;
export {
  screenWidth,
  screenHeight,
  colorSchema,
  /*textSize,*/ getSize,
  baseTextSize,
  defaultFont,
  getFontStyle,
  fonts
};
