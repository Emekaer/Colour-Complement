import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ColourTile2 = (props) => {
  return (
    <View>
      <View
        style={{
          ...styles.component,
          backgroundColor: props.chosenColour,
          shadowColor: props.chosenColour,
        }}
      ></View>
      <Text selectable={true} style={{ ...styles.text }}>
        {props.schemeColor.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 4,
    width: 150,
    height: 125,
    justifyContent: "center",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  text: {
    fontWeight: "400",
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
  },
  icon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default ColourTile2;
