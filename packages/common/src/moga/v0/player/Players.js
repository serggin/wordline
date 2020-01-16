import Gamer from "./Gamer";
import CompPlayer from "common/src/tiers/gameTier/WL_gameTier_v0/player/CompPlayer";

export default class Players {
  constructor(config) {
    this.prepare(config);
  }

  [Symbol.iterator]() {
    return this.players.values();
  }

  prepare(config) {
    this.players = config.map(playerConfig => {
      const { type, alias, name, metrics: metricsObj } = playerConfig;
      let player;
      if (type == "compp") {
        player = new CompPlayer({ type, alias, name, metricsObj });
      } else if (type == "gamer") {
        player = new Gamer({ type, alias, name, metricsObj });
      } else {
        const message = "Players.prepare() unknown type";
        console.error(message, playerConfig);
        throw new Error(message);
      }
      return player;
    });

    this.aliases = this.getAliases();
  }

  getPlayers = () => {
    return this.players.map(player => player.getPlayerObject());
  };

  getAliases() {
    return this.players.map(player => player.getAlias());
  }

  getNextAlias(arr, alias) {
    if (arr.length == 1) {
      return arr[0];
    }
  }

  getNextPlayerAlias(alias) {
    for (let index = 0; index < this.aliases.length; index++) {
      if (this.aliases[index] == alias) {
        index++;
        if (index < this.aliases.length) {
          return this.aliases[index];
        }
        return this.aliases[0];
      }
    }
  }

  getNextPlayerActiveAlias(alias) {
    let prevActive = false;
    let current = false;
    let nextActive = false;
    let currentActive = false;
    for (let activeAlias of this.activeAliases) {
      if (activeAlias.alias == alias) {
        current = activeAlias.alias;
        currentActive = activeAlias.active;
      } else if (activeAlias.active) {
        if (current) {
          nextActive = activeAlias.alias;
          break;
        } else {
          if (!prevActive) {
            prevActive = activeAlias.alias;
          }
        }
      }
    }
    return nextActive || prevActive || (currentActive && current);
  }

  reset() {
    for (let player of this.players) {
      player.reset();
    }
    this.activeAliases = this.aliases.map(alias => ({
      alias,
      active: true
    }));
    this.allPassed = false;
  }

  getByAlias(alias) {
    for (let player of this.players) {
      if (player.getAlias() == alias) {
        return player;
      }
    }
    return null;
  }

  setPass(alias, mode) {
    this.getByAlias(alias)
      .getPlayerStateModel()
      .setPass(mode);
    for (let activeAlias of this.activeAliases) {
      if (activeAlias.alias == alias) {
        activeAlias.active = false;
        break;
      }
    }
    this.checkAllPassed();
    const player = this.getByAlias(alias);
    player.setPass();
  }

  checkAllPassed() {
    for (let activeAlias of this.activeAliases) {
      if (activeAlias.active) {
        return;
      }
    }
    this.allPassed = true;
  }

  areAllPassed() {
    return this.allPassed;
  }
}
