import React from "react";
import { View, Text, StyleSheet } from "react-native";

import globalStyles, {
  colorSchema,
  getSize,
  screenWidth,
  screenHeight
} from "common/src/styles";
import { imageSources, TopSpanielGamesLogo } from "common/src/assets/images";

import BaseScreen from "common/src/components/visual/BaseScreen";
import StyledButton from "common/src/components/visual/form/StyledButton";
import ImageButton from "common/src/components/visual/form/ImageButton";

export default class Choice extends BaseScreen {
  static programTier = null;
  state = {
    programConfig: null,
    showSizes: true
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[globalStyles.screen, { paddingTop: 0 }]}>
        <TopSpanielGamesLogo />

        {this.state.games && (
          <View style={styles.gamesContainer}>
            {this.state.games.map(game => {
              return (
                <StyledButton
                  key={game.name}
                  style={{ container: styles.container, text: styles.button }}
                  onPress={() => {
                    this.chooseGame(game.name);
                  }}
                >
                  {game.name}
                </StyledButton>
              );
            })}
          </View>
        )}
        <ImageButton
          imageSource={imageSources.girlImage}
          maxWidth={screenWidth / 2}
          maxHeight={screenHeight * 0.4}
          caption="Об игре..."
          style={StyleSheet.flatten(imageButtonStyles)}
          onPress={() => navigate("About")}
        />
        {this.state.showSizes && (
          <View style={styles.sizes}>
            <Text style={globalStyles.text}>ScreenWidth : {screenWidth}</Text>
            <Text style={globalStyles.text}>ScreenHeight: {screenHeight}</Text>
          </View>
        )}
      </View>
    );
  }

  onGameChange = (itemValue, itemPosition) => {
    this.setState({
      game: this.state.games.find(item => {
        return item.name == itemValue;
      })
    });
  };

  chooseGame(name) {
    this.state.games.find(game => {
      if (game.name == name) {
        Choice.programTier.gameChoosed(game);
        return true;
      }
    });
  }

  onGameChoosed = () => {
    Choice.programTier.gameChoosed(this.state.game);
  };

  setContent(content) {
    const { programConfig, games } = content;
    this.setState({
      programConfig: JSON.stringify(programConfig),
      games,
      game: games[0]
    });
  }

  didFocusHandler(payload) {
    super.didFocusHandler(payload);
    Choice.programTier.execute();
  }

  static navigationOptions = {
    title: "Choice"
  };
}

const imageButtonStyles = StyleSheet.create({
  container: {
    backgroundColor: colorSchema.bg[0]
  },
  caption: {
    color: colorSchema.hlink[0]
  }
});
const styles = StyleSheet.create({
  gamesContainer: {
    alignSelf: "center",
    justifyContent: "space-around",
    minHeight: getSize("TEXT", "LARGE") * 6
  },
  container: {
    backgroundColor: colorSchema.bg[2]
  },
  button: {
    fontSize: getSize("TEXT", "MEDIUM")
  },
  sizes: {
    position: "absolute",
    right: 10,
    bottom: 10
  }
});
