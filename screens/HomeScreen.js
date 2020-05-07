import React, { useState, useLayoutEffect } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { ColorPicker } from "react-native-color-picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import ColourTile from "../components/ColourTile";
import { complementaryColor, triad } from "../functions/functions";

const HomeScreen = (props) => {
  const [colour, setColour] = useState(false);
  const [chosenColor, setchosenColor] = useState();

  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Reset" iconName={"md-refresh"} onPress={resetHandler} />
        </HeaderButtons>
      ),
    });
  }, [navigation, resetHandler]);

  const pressHandler = () => {
    navigation.navigate("AdjustScreen", { oldColor: chosenColor });
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
          <View style={{ ...styles.pickedColor, backgroundColor: chosenColor }}>
            <Text>{chosenColor}</Text>
          </View>
        ) : (
          <ColorPicker
            style={{ flex: 1 }}
            onColorSelected={(color) => {
              setColourHandler(color);
            }}
          />
        )}
      </View>
      <View>
        {colour ? (
          <ColourTile
            pressHandler={pressHandler}
            chosenColour={triad(chosenColor).triad2}
          />
        ) : (
          <View><Text>Please Select a colour</Text></View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
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
  pickedColor: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
});

export default HomeScreen;
