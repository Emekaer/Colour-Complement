import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const HomeScreen = (props) => {
  const pressHandler = () => {
    props.navigation.navigate("AdjustScreen");
  };

  const longPressHandler = () => {
    props.navigation.navigate("DetailScreen");
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity onLongPress={longPressHandler} onPress={pressHandler}>
        <View style={styles.component}>
          <Text>RED</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  component: {
    margin: 15,
    width: 200,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});

export default HomeScreen;
