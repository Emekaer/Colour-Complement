import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { PresenterComponentsProps } from "../helpers/types"


const ColourCard = (props: PresenterComponentsProps) => {
  return (
    <View
      style={{
        ...styles.component,
        backgroundColor: props.chosenColour,
        shadowColor: props.chosenColour,
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  component: {
    margin: 15,
    width: 150,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
});

export default ColourCard;
