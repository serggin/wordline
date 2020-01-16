import Player from "./Player";

export default class Gamer extends Player {
  constructor(props) {
    super(props);
  }

  makeMove(callback) {
    // callback does not used
    this.playerView.makeMove({
      alias: this.alias,
      name: this.name
    });
  }
}
