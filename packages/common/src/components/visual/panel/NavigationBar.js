import React from "react";
import { View } from "react-native";

import globalStyles from "common/src/styles/index";

export default props => {
  return <View style={globalStyles.navigationBar}>{props.children}</View>;
};
