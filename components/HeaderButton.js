import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={props.colour ? props.colour : "white"}
      buttonStyle={{ marginTop: 20 }}
    />
  );
};

export default CustomHeaderButton;
