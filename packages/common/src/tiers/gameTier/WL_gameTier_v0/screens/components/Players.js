import React from "react";
import { View, StyleSheet } from "react-native";
import Player from "./Player";

const styles = StyleSheet.create({
  players: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default ({ players }) => {
  return (
    <View style={styles.players}>
      {players.map(player => {
        const playerProps = (({ name, metrics, pass, timer }) => ({
          name,
          metrics,
          pass,
          timer
        }))(player);
        return <Player key={player.alias} {...playerProps} />;
      })}
    </View>
  );
};
