/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";

import getAppContainer from "./components/AppNavigation";
import NavigationService from "./components/NavigationService";
import Splash from "./screens/Splash";
import ProgramTier from "./tiers/programTier/WL_programTier_v0/ProgramTier";

export default class App extends React.Component {
  state = {
    screens: {
      routeConfigs: {
        Splash
      },
      navigatorConfig: {
        initialRouteName: "Splash"
      }
    }
  };

  constructor(props) {
    super(props);
    this.programTier = new ProgramTier(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.programTier.prepare();
    }, 4000);
  }

  navigate = (route, params = null) => {
    NavigationService.navigate(route, params);
  };

  appendScreens = screens => {
    this.setState({
      screens: {
        routeConfigs: {
          ...this.state.screens.routeConfigs,
          ...screens.routeConfigs
        },
        navigatorConfig: {
          ...this.state.screens.navigatorConfig,
          ...screens.navigatorConfig
        }
      }
    });
  };

  render() {
    const screens = this.state.screens;
    const AppContainer = getAppContainer(
      screens.routeConfigs,
      screens.navigatorConfig
    );
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
