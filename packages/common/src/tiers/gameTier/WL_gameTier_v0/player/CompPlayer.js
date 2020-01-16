import Player from "common/src/moga/v0/player/Player";
import RandomMoveStrategy from "./RandomMoveStrategy";

export default class CompPlayer extends Player {
  constructor(props) {
    super(props);
  }

  prepare(gameModel) {
    this.gameModel = gameModel;
    this.moveStrategy = new RandomMoveStrategy(gameModel);
  }

  makeMove(callback) {
    let moveData = this.moveStrategy.makeMove();
    moveData = Object.assign({ alias: this.alias }, moveData);
    callback(moveData);
  }
}
