import GameScreen from "./screens/GameScreen";
import Players from "common/src/moga/v0/player/Players";
import PlayerView from "common/src/moga/v0/player/PlayerView";
import GameModel from "./model/GameModel";
import GameController from "./controller/GameController";

export default class GameTier {
  constructor(gamecaseTier) {
    this.gamecaseTier = gamecaseTier;
    GameScreen.gameTier = this;
  }

  getTierName() {
    return "WL_gameTier_v0";
  }

  prepare = gameConfig => {
    this.gameConfig = gameConfig;
    //    console.log("gameConfig=", gameConfig);
    this.gamecaseTier.appendScreens(this.getScreens());
    this.createPlayers();
    this.createModels();
    this.gameModel.includePlayerSModels(this.players);
    this.createControllers();
  };

  createPlayers = () => {
    this.players = new Players(this.gameConfig.players);
    for (let player of this.players) {
      if (player.getType() == "gamer") {
        player.setPlayerView(new PlayerView(this.makeMove, null));
      } else if (player.getType() == "compp") {
        player.setPlayerView(new PlayerView(null, this.showMove));
      }
    }
  };

  makeMove = params => {
    this.gameScreen.inviteGamer({
      alias: params.alias,
      message: {
        type: "move",
        param: params.name
      },
      actionType: "pass"
    });
  };

  showMove = move => {};

  createModels() {
    this.gameModel = new GameModel(this.gameConfig);
  }

  createControllers() {
    this.gamecontroller = new GameController(this.gameModel);
  }

  getScreens = () => {
    this.screens = {
      routeConfigs: {
        GameScreen: GameScreen
      },
      navigatorConfig: {
        initialRouteName: "GameScreen"
      }
    };
    return this.screens;
  };

  execute = gameScreen => {
    this.gameScreen = gameScreen;
    this.start();
  };

  start() {
    //reset models and controllers
    this.gamecontroller.reset();
    this.initialize();
    //[if] Controller makes comp`s move
    //Controller invites gamer to move
    this.gamecontroller.takeControl(this.controllerCallback);
  }

  initialize() {
    this.gameScreen.initialize({
      players: this.players.getPlayers(),
      message: null,
      wordline: { letters: "", lastIndex: 0 },
      actionType: null,
      movetime: this.gameConfig.movetime
      //      totalWords: this.gameModel.getDescriptionModel().getDictionary().getTotalWords(),
    });
  }

  getTotalWords() {
    return this.gameModel
      .getDescriptionModel()
      .getDictionary()
      .getTotalWords();
  }

  getLongestWord() {
    return this.gameModel
      .getDescriptionModel()
      .getDictionary()
      .getLongestWord();
  }

  controllerCallback = (action, params) => {
    //    console.log("controllerCallback() action="+action, "params=", params);
    switch (action) {
      case "invite":
        this.gameScreen.inviteGamer({
          alias: params.alias,
          message: {
            type: "move",
            param: params.name
          },
          actionType: "pass"
        });
        break;
      case "error":
        this.gameScreen.showMessage({
          type: "imp",
          param: params
        });
        break;
      case "refresh":
        this.gameScreen.refresh({
          ...params,
          players: this.players.getPlayers()
        });
        break;
      case "draw":
        this.gameScreen.resultDraw();
        break;
      case "win":
        this.gameScreen.resultWin({
          ...params,
          players: this.players.getPlayers()
        });
        break;
    }
  };

  moveDone(moveData) {
    //    console.log("moveDone() moveData=", moveData);
    const { actionType } = moveData;
    if (actionType == "onceMore") {
      this.start();
    } else {
      this.gamecontroller.handleMove(moveData);
    }
  }
}
