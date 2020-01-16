export default class PlayerView {
  constructor(makeMove, showMove) {
    this._makeMove = makeMove;
    this._showMove = showMove;
  }

  makeMove(params) {
    this._makeMove(params);
  }

  showMove(move) {
    this._showMove(move);
  }
}
