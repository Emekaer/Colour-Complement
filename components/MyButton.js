import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";


const MyButton = (props) => {
  return (
    <TouchableOpacity  onPress={props.onPress}>
      <View style={styles.screen}>
        <Text style={{color: "white"}}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    width: 80,
    height: 25,
    borderRadius: 12.5
  },
});

export default MyButton;
