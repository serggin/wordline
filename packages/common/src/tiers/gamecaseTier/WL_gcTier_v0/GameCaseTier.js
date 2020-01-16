import WelcomeScreen from "./screens/WelcomeScreen";
import RulesScreen from "./screens/RulesScreen";
import { getGameTier } from "common/src/tiers";

export default class GameCaseTier {
  constructor(programTier) {
    this.programTier = programTier;
    WelcomeScreen.gamecaseTier = this;
  }

  getTierName() {
    return "WL_gcTier_v0";
  }

  prepare = gamecaseConfig => {
    this.gamecaseConfig = gamecaseConfig;

    this.gamecaseConfig.players.forEach(player => {
      player = Object.assign(player, {
        metrics: {
          score: 0,
          wins: 0,
          losses: 0
        }
      });
    });
    this.gamecaseConfig.turn = this.gamecaseConfig.players[0].alias;
    //    console.log("this.gamecaseConfig=", this.gamecaseConfig);
    this.appendScreens(this.getScreens());
  };

  appendScreens = screens => {
    this.programTier.appendScreens(screens);
  };

  getScreens = () => {
    this.screens = {
      routeConfigs: {
        WelcomeScreen,
        Rules: RulesScreen
      },
      navigatorConfig: {
        initialRouteName: "WelcomeScreen"
      }
    };
    return this.screens;
  };

  execute = gamecaseScreen => {
    this.gamecaseScreen = gamecaseScreen;
    this.gamecaseScreen.initialize(this.gamecaseConfig);
  };

  start = ({ playersNames, movetime }) => {
    const gameConfig = {
      players: this.gamecaseConfig.players.map(player =>
        Object.assign(player, {
          metrics: {
            score: 0,
            wins: 0,
            losses: 0
          },
          name: playersNames[player.alias]
        })
      ),
      turn: this.gamecaseConfig.players[0].alias,
      dict: this.gamecaseConfig.dict,
      movetime
    };
    //    console.log("gameConfig=", gameConfig);
    this.gameTier = new (getGameTier(this.gamecaseConfig.gameTier))(this);
    this.gameTier.prepare(gameConfig);
  };
}
