import React from "react";
import { View, Text, Button } from "react-native";

import globalStyles, { screenWidth } from "common/src/styles/index";
import { TopSpanielGamesLogo } from "common/src/assets/images";
import BaseScreen from "common/src/components/visual/BaseScreen";
import Players from "./components/Players";
import StateMessage from "./components/StateMessage";
import WlButtons from "./components/WlButtons";
import Letters from "./components/Letters";
import WlLetters from "./components/WlLetters";

import Timer from "common/src/components/visual/NumberTimer";

export default class GameScreen extends BaseScreen {
  static gameTier = null;
  state = {
    players: null,
    message: null,
    wordline: { letters: "", lastIndex: 0 },
    actionType: null,
    showLetters: false,
    addLetterTo: "",
    letters: "абвгдеёжзийклмнопрстуфхцчшщьыъэюя",
    alias: false,
    showTest: false,
    movetime: false,
    timerOn: false,
    screenWidth,
    totalWords: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    const onLetter = letter => {
      if (letter) {
        this.moveDone({
          letter: {
            letter,
            addLetterTo: this.state.addLetterTo
          }
        });
      }
      this.setState({ showLetters: false });
    };
    const onWlButton = button => {
      this.setState({
        showLetters: true,
        addLetterTo: button
      });
    };
    const onAction = actionType => {
      this.moveDone({ actionType });
    };

    const onTimer = () => {
      this.moveDone({ actionType: "timer" });
    };

    return (
      <View style={[globalStyles.screen, { paddingTop: 0 }]}>
        <TopSpanielGamesLogo />

        <View
          style={{
            flex: 2,
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          {this.state.message && (
            <StateMessage messageObj={this.state.message} />
          )}

          <View style={{ alignSelf: "center" }}>
            {WlLetters(this.state.wordline, this.state.screenWidth)}
          </View>
          <WlButtons
            actionType={this.state.actionType}
            onAction={onAction}
            onButton={onWlButton}
          />

          {this.state.showTest && <Button title="Test" onPress={this.onTest} />}
          {this.state.timerOn && (
            <Timer
              ref={component => (this.timer = component)}
              timeLimit={this.state.movetime}
              onTimer={onTimer}
            />
          )}
          {this.state.players && <Players players={this.state.players} />}
          {this.state.totalWords && (
            <View style={{ alignSelf: "center" }}>
              <Text
                style={[
                  {
                    paddingTop: 5
                  }
                ]}
              >
                Всего в словаре слов - {this.state.totalWords}
              </Text>
            </View>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <View>
            <Letters
              visible={this.state.showLetters}
              letters={this.state.letters}
              onLetter={onLetter}
            />
          </View>
        </View>
      </View>
    );
  }

  didFocusHandler(payload) {
    super.didFocusHandler(payload);
    GameScreen.gameTier.execute(this);
  }

  initialize({ players, message, wordline, actionType, movetime }) {
    this.setState({
      players,
      message,
      wordline,
      actionType,
      showLetters: false,
      movetime
    });
  }

  moveDone(moveResult) {
    GameScreen.gameTier.moveDone({
      alias: this.state.alias,
      ...moveResult
    });
    if (!this.state.totalWords) {
      const totalWords = GameScreen.gameTier.getTotalWords();
      if (totalWords) {
        this.setState({ totalWords });
      }
    }
  }

  onTest = () => {
    this.testLongLetters();
    //this.testMessage();
    //this.testLetters();
    //this.testAction();
    //this.setState({ showLetters: true });
  };

  testMessage = () => {
    const types = ["move", "imp", "win", "choose"];
    let typeIndex = 0;
    const id = setInterval(() => {
      const type = types[typeIndex++];
      const player = "Gamer";
      this.setState({
        message: { type, param: player }
      });
      if (typeIndex >= types.length) {
        clearInterval(id);
      }
    }, 2000);
  };

  testLongLetters = () => {
    const letters = GameScreen.gameTier.getLongestWord();
    this.setState({
      wordline: { letters, lastIndex: 0 }
    });
  };

  testLetters = () => {
    const words = [
      "",
      "d",
      "dl",
      "rdl",
      "rdli",
      "ordli",
      "wordli",
      "wordlin",
      "wordline"
    ];
    const indexes = [0, 0, 1, 0, 3, 0, 0, 6, 7];
    let index = 0;
    const id = setInterval(() => {
      const letters = words[index];
      const lastIndex = indexes[index++];
      this.setState({
        wordline: { letters, lastIndex }
      });
      if (index >= words.length) {
        clearInterval(id);
      }
    }, 1500);
  };

  testAction = () => {
    const types = ["pass", "resigned", "onceMore"];
    let index = 0;
    const id = setInterval(() => {
      this.setState({
        actionType: types[index++]
      });
      if (index >= types.length) {
        clearInterval(id);
      }
    }, 3000);
  };

  afterMove = wordline => {
    this.setState({
      wordline: wordline
    });
  };

  inviteGamer({ alias, message, actionType }) {
    if (this.timer) {
      this.timer.stopTimer();
      this.timer.startTimer();
    }

    this.setState({
      alias,
      message,
      actionType,
      timerOn: Boolean(this.state.movetime)
    });
  }

  showMessage(message) {
    this.setState({ message: message });
  }

  refresh({ wordline, players }) {
    //    console.log("refresh() wordline=", wordline);
    this.setState({ wordline, players });
  }

  resultDraw() {
    this.setState({
      message: { type: "draw" },
      actionType: "onceMore"
    });
    if (this.timer) {
      this.timer.stopTimer();
    }
  }

  resultWin({ winAlias, winName, score, players }) {
    this.setState({
      message: { type: "win", param: winName + ", Счет - " + score },
      actionType: "onceMore",
      players
    });
    if (this.timer) {
      this.timer.stopTimer();
    }
  }

  static navigationOptions = {
    title: "GameScreen"
  };
}
