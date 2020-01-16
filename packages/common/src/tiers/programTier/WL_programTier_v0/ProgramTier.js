import TheLoader from "common/src/components/helpers/TheLoader";

import Choice from "./screens/Choice";
import About from "./screens/About";

import BaseScreen from "common/src/components/visual/BaseScreen";
import { getGameCaseTier } from "common/src/tiers";

export default class ProgramTier {
  constructor(app) {
    this.app = app;
    Choice.programTier = this;
  }

  getClassName() {
    return "***ProgramTier***";
  }

  prepare = () => {
    this.appendScreens(this.getScreens());
  };

  appendScreens = screens => {
    this.app.appendScreens(screens);
  };

  execute = () => {
    this.loadConfig()
      .then(() => {
        this.readConfig();
        this.chooseGame();
      })
      .catch(error => {
        console.error("ProgramTier.execute() " + error.message);
        throw error;
      });
  };

  loadConfig = () => {
    return TheLoader.loadJSON("config.json")
      .then(obj => {
        this.programConfig = obj;
      })
      .catch(error => {
        console.error("loadConfig() " + error.message);
        throw error;
      });
  };

  // Must be!
  readConfig = () => {
    //    console.log("programConfig=", this.programConfig);
  };

  chooseGame = () => {
    const games = this.programConfig.games;
    if (BaseScreen.currentScreen.routeName == "Choice") {
      BaseScreen.currentScreen.setContent({
        //        programConfig: this.programConfig,
        games
      });
    } else {
      const message =
        "error: is not Choice screen, but " +
        BaseScreen.currentScreen.routeName;
      console.error(message);
      throw new Error(message);
    }
  };

  gameChoosed(game) {
    this.game = game;
    this.prepareGame().then(gamecaseConfig => {
      this.gamecaseTier = new (getGameCaseTier(gamecaseConfig.gamecaseTier))(
        this
      );
      this.gamecaseTier.prepare(gamecaseConfig);
    });
  }

  prepareGame = () => {
    const { gamecaseTier, rules, dict } = this.programConfig;
    const gamecaseConfig = { gamecaseTier, rules, dict, ...this.game };
    return Promise.resolve(gamecaseConfig);
  };

  getScreens = () => {
    this.screens = {
      routeConfigs: {
        Choice,
        About
      },
      navigatorConfig: {
        initialRouteName: "Choice"
      }
    };
    return this.screens;
  };
}
