import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const ColourTile = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.pressHandler}>
        <View
          style={{ ...styles.component, backgroundColor: props.chosenColour }}
        >
          <Text style={{...styles.text, /* color:props.mainColor */}}>Click to Adjust</Text>
  <Text style={{...styles.text, /* color:props.mainColor */}}>{props.schemeType}</Text>
  <Text style={{...styles.text, /* color:props.mainColor */}}>{props.schemeColor.toUpperCase()}</Text>
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
    shadowColor: 'black',
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
