import { readFile } from "./platform";

export default class TheLoader {
  static loadJSON(path) {
    return readFile(path).then(text => {
      try {
        let obj = JSON.parse(text);
        return obj;
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  static loadTxt(path) {
    return readFile(path);
  }
}
