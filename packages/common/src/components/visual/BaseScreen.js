import React from "react";

export default class BaseScreen extends React.Component {
  static currentScreen;

  constructor(props) {
    super(props);
    this.routeName = props.navigation.state.routeName;
    props.navigation.addListener("didFocus", this.getDidFocusHandler());
  }

  didFocusHandler(payload) {
    BaseScreen.currentScreen = this;
  }

  getDidFocusHandler() {
    return payload => {
      this.didFocusHandler(payload);
    };
  }
}
