/**
 * Главный компонент навигации в приложении
 */
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

const { createNavigator, navConfig } = Platform.select({
  web: {
    createNavigator: createStackNavigator,
    navConfig: {
      headerMode: "none"
    }
  },
  ios: {
    createNavigator: createBottomTabNavigator,
    navConfig: {}
  },
  android: {
    createNavigator: createDrawerNavigator,
    navConfig: {}
  }
});

export default (routeConfigs, navigatorConfig) => {
  try {
    const AppNavigator = createNavigator(routeConfigs, {
      ...navigatorConfig,
      ...navConfig
    });
    if (Platform.OS === "web") {
      var AppContainer = createAppContainer(AppNavigator);
    } else {
      AppContainer = createAppContainer(AppNavigator);
    }
    return AppContainer;
  } catch (err) {
    console.log("AppNavigation", err.message);
    console.log(err.stack);
    throw err;
  }
};
