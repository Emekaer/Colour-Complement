import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const ColourTile = (props) => {
  const [selected, setSelected] = useState(false);

  const longPressHandler = () => {
    setSelected((selected) => !selected);
  };

  return (
    <TouchableOpacity
      onPress={props.pressHandler}
      onLongPress={longPressHandler}
    >
      <View
        style={{ ...styles.component, backgroundColor: props.chosenColour, 
          shadowColor: props.chosenColour, }}
      >
        <Text style={{ ...styles.text }}>Click to Adjust</Text>
        <Text style={{ ...styles.text }}>{props.schemeType}</Text>
        <Text style={{ ...styles.text }}>
          {props.schemeColor.toUpperCase()}
        </Text>
        {selected ? (
          <View
            style={{
              marginBottom: 0,
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              height: "15%",
              backgroundColor: "#ccc",
            }}
          >
            <Text>SELECTED</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
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
  text: {
    fontWeight: "400",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default ColourTile;
