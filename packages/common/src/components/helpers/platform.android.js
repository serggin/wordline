var RNFS = require("react-native-fs");

function readFile(path) {
  //  console.warn('RNFS.DocumentDirectoryPath=', RNFS.DocumentDirectoryPath);
  return RNFS.readFileAssets(path, "utf8");
}

export { readFile };
