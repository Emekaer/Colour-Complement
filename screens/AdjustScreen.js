import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import { rgbString } from "../functions/functions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";

const AdjustScreen = (props) => {
  const oldColor = props.route.params.oldColor;
  const setColor = props.route.params.color;

  const [changedColor, setChangedColor] = useState(oldColor);
  const [newColor, setNewColor] = useState();

  const { navigation } = props;

  navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Reset" iconName={"md-save"} onPress={saveHandler} />
      </HeaderButtons>
    ),
  });

  const colorChangeHandler = (color) => {
    setChangedColor(fromHsv(color));
    setNewColor(fromHsv(color));
  };


  const saveHandler = () => {
    navigation.navigate("HomeScreen", { newColor: newColor });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.infoArea}>
        <Text style={styles.text}>HEX CODE</Text>
        <Text style={styles.text}>{changedColor}</Text>
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.text}>RGB</Text>
        <Text style={styles.text}>{rgbString(changedColor)}</Text>
      </View>

      <ColorPicker
        style={{ flex: 1, flexDirection: "column", height: 200 }}
        oldColor={oldColor}
        defaultColor={setColor}
        onColorChange={(color) => {
          colorChangeHandler(color);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  infoArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 100,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: "400",
    fontSize: 23,
  },
});

export default AdjustScreen;
