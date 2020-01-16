import { Platform } from "react-native";

const fonts = ["Comfortaa", "Roboto_Condensed", "Staatliches", "Circe"];
const defaultFont = fonts[0];

function getFontIndex(fontName) {
  return fonts.findIndex(font => fontName == font);
}

const fontStyles = (function(fonts) {
  if (Platform.OS === "web") {
    return fonts.map(font => ({ fontFamily: font }));
  }
  if (Platform.OS === "android") {
    return {
      regular: [
        { fontFamily: "Comfortaa-Regular" },
        { fontFamily: "RobotoCondensed-Regular" }, // не проверял
        { fontFamily: "Staatliches-Regular" }, // не проверял
        { fontFamily: "Circe-Regular" }
      ],
      bold: [
        { fontFamily: "Comfortaa-Bold" },
        { fontFamily: "RobotoCondensed-Bold" }, // не проверял
        { fontWeight: "bold" }, // не проверял, как default
        { fontFamily: "Circe-Bold" }
      ],
      italic: [
        { fontStyle: "italic" }, // как default
        { fontFamily: "RobotoCondensed-Italic" }, // не проверял
        { fontStyle: "italic" }, // как default
        { fontStyle: "italic" } // как default
      ]
    };
  }
  if (Platform.OS === "ios") {
    return false; // пока не знаю
  }
})(fonts);

//console.log('fontStyles=', fontStyles);

function getKindStyle(kind) {
  switch (kind) {
    case "bold":
      return { fontWeight: "bold" };
    case "italic":
      return { fontStyle: "italic" };
    case "default":
    case "regular":
    default:
      return {};
  }
}

function getFontStyle(family, kind = "regular") {
  let fontIndex = -1;
  if (family) {
    fontIndex = getFontIndex(family);
  }
  const kindStyle = getKindStyle(kind);
  if (fontIndex == -1) {
    return kindStyle;
  } else {
    if (Platform.OS === "web") {
      return { ...fontStyles[fontIndex], ...kindStyle };
    }
    if (Platform.OS === "android") {
      if (fontStyles.hasOwnProperty(kind)) {
        return fontStyles[kind][fontIndex];
      } else {
        //console.warn("getFontStyle() Invalid kind=", kind);
        return kindStyle;
      }
    }
  }
}

//console.log("Testing fonts:");
[false, "", "default", "regular", "bold", "italic"].forEach(kind => {
  fonts.forEach(font => {
    let style = getFontStyle(font, kind);
    //console.log(font+" "+kind+" -> ", style);
  });
});

export { fonts, defaultFont, getFontStyle };
