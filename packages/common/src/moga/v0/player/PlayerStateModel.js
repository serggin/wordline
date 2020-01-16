import PlayerMetrics from "./PlayerMetrics";

export default class PlayerStateModel {
  constructor(alias, metricsObj) {
    this.alias = alias;
    this.metrics = new PlayerMetrics(metricsObj);
    this.reset();
  }

  getMetrics() {
    return this.metrics;
  }

  setPass(mode) {
    this.pass = true;
    this.timer = mode == "timer";
  }

  getPass() {
    return this.pass;
  }

  getTimer() {
    return this.timer;
  }

  reset() {
    this.pass = false;
    this.timer = false;
    this.move = null;
  }
}
