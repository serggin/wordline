export default class PlayerMetrics {
  constructor({ score = 0, wins = 0, losses = 0, lifes = 0 }) {
    this.score = score;
    this.wins = wins;
    this.losses = losses;
    this.lifes = lifes;
  }

  addMetrics = ({ score = 0, wins = 0, losses = 0, lifes = 0 }) => {
    this.score += score;
    this.wins += wins;
    this.losses += losses;
    this.lifes += lifes;
  };

  getMetrics = () => {
    return (({ score, wins, losses, lifes }) => ({
      score,
      wins,
      losses,
      lifes
    }))(this);
  };
}
