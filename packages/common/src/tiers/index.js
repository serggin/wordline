import WL_gcTier_v0 from "./gamecaseTier/WL_gcTier_v0/GameCaseTier";
import WL_gameTier_v0 from "./gameTier/WL_gameTier_v0/GameTier";

function getProgramTier(name) {}

function getGameCaseTier(name) {
  switch (name) {
    case "WL_gcTier_v0":
      return WL_gcTier_v0;
    default:
      return null;
  }
}

function getGameTier(name) {
  switch (name) {
    case "WL_gameTier_v0":
      return WL_gameTier_v0;
    default:
      return null;
  }
}

export { getProgramTier, getGameCaseTier, getGameTier };
