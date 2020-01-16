import React from "react";
import { Platform, Modal as ModalMobile } from "react-native";
import ModalWeb from "modal-react-native-web";

export default ({ visible, children }) => {
  if (Platform.OS === "web") {
    return (
      <ModalWeb visible={visible} transparent={true} ariaHideApp={false}>
        {children}
      </ModalWeb>
    );
  } else {
    return (
      <ModalMobile visible={visible} transparent={true}>
        {children}
      </ModalMobile>
    );
  }
};
