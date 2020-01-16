import PlayerStateModel from "./PlayerStateModel";

export default class Player {
  constructor({ type, alias, name, metricsObj }) {
    this.type = type;
    this.alias = alias;
    this.name = name;
    this.playerStateModel = new PlayerStateModel(alias, metricsObj);
    this.pass = false;
  }

  setPlayerView(playerView) {
    this.playerView = playerView;
  }

  getPlayerView() {
    return this.playerView;
  }

  getPlayerObject = () => {
    return {
      type: this.type,
      alias: this.alias,
      name: this.name,
      metrics: this.playerStateModel.getMetrics(),
      pass: this.pass,
      timer: this.playerStateModel.getTimer()
    };
  };

  getType() {
    return this.type;
  }

  getAlias() {
    return this.alias;
  }

  getName() {
    return this.name;
  }

  getPlayerStateModel() {
    return this.playerStateModel;
  }

  addMetrics(metrics) {
    //    console.log("getMetrics()=", this.playerStateModel.getMetrics());
    this.playerStateModel.getMetrics().addMetrics(metrics);
  }

  reset() {
    this.pass = false;
    this.playerStateModel.reset();
  }

  setPass() {
    this.pass = true;
  }

  /**
   * @returns {invite} | {move}
   */
  makeMove(callback) {
    //
    throw new Error("Player.makeMove() should be overrided in extending class");
  }
}
