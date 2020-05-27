import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ColourTile = (props) => {
  const [selected, setSelected] = useState(false);

  const longPressHandler = () => {
    setSelected((selected) => !selected);
    props.selection();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={props.pressHandler}
        onLongPress={longPressHandler}
      >
        <View
          style={{
            ...styles.component,
            backgroundColor: props.chosenColour,
            shadowColor: props.chosenColour,
          }}
        >
          {selected ? (
            <View style={styles.icon}>
              <Ionicons
                name="md-star"
                size={23}
                color="white"
                style={{ textShadowColor: "#666666", textShadowRadius: 1 }}
              />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
      <Text selectable={true} style={{ ...styles.text }}>{props.schemeType}</Text>
      <Text selectable={true} style={{ ...styles.text }}>{props.schemeColor.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    flex: 1,
    margin: 15,
    padding: 10,
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

export default ColourTile;
