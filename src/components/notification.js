import React from "react";
import { Toast, useToast } from "native-base";

export const showNotification = ({ text }) => {
  return Toast.show({
    title: text,
    placement: "bottom-left",
    marginLeft: 10,
  });
};
