import React, { useState, useLayoutEffect} from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { ColorPicker } from "react-native-color-picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";

const HomeScreen = (props) => {
  const [colour, setColour] = useState(false);
  const [chosenColor, setchosenColor] = useState();

  const {navigation} =props

  useLayoutEffect(() => {
    navigation.setOptions({  headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Reset" iconName={"md-refresh"} onPress={resetHandler} />
      </HeaderButtons>
    )});
  }, [navigation,resetHandler]);

  const pressHandler = () => {
    navigation.navigate("AdjustScreen");
  };

  const longPressHandler = () => {
   navigation.navigate("DetailScreen");
  };

  const setColourHandler = (color) => {
    setColour(true);
    setchosenColor(color);
  };

  const resetHandler = () => {
    setColour(false);
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.selectionArea}>
        {colour ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: chosenColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{chosenColor}</Text>
          </View>
        ) : (
          <ColorPicker
            style={{ flex: 1 }}
            oldColor="red"
            onColorSelected={(color) => {
              setColourHandler(color);
            }}
          />
        )}
      </View>
      <TouchableOpacity onLongPress={longPressHandler} onPress={pressHandler}>
        <View style={styles.component}>
          <Text>RED</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },
  component: {
    margin: 15,
    width: 150,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  selectionArea: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 200,
    padding: 10,
    marginBottom: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
