import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import { hexToRgb, rgbString } from "../functions/functions";

const AdjustScreen = (props) => {
  const oldColor = props.route.params.oldColor;

  const [changedColor, setChangedColor] = useState(oldColor);

  const colorChangeHandler = (color) => {
    setChangedColor(fromHsv(color));
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
