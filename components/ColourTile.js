import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const ColourTile = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.pressHandler}>
        <View
          style={{ ...styles.component, backgroundColor: props.chosenColour }}
        >
          <Text>Click to Adjust</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    margin: 15,
    width: 150,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "400",
    fontSize: 23,
  },
});

export default ColourTile;
