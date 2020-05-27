import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ColourBar = (props) => {
  return (
    <View
      style={{
        ...styles.component,
        backgroundColor: props.chosenColour,
        shadowColor: props.chosenColour,
      }}
    >
      <Text selectable={true} style={styles.text}>
        {props.chosenColour.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    marginHorizontal: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    textShadowColor: "#666666",
    textShadowRadius: 1,
    letterSpacing: 1,
  },
});

export default ColourBar;
