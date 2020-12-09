import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { hexToRgb } from "../functions/functions";
import { PresenterComponentsProps} from "../helpers/types"



const ColourBar = (props: PresenterComponentsProps) => {
  return (
    <View>
      <View style={styles.bar}>
        <View
          style={{
            ...styles.component,
            backgroundColor: `rgba(${hexToRgb(props.chosenColour)?.r},${
              hexToRgb(props.chosenColour)?.g
            },${hexToRgb(props.chosenColour)?.b},1)`,
            shadowColor: `rgba(${hexToRgb(props.chosenColour)?.r},${
              hexToRgb(props.chosenColour)?.g
            },${hexToRgb(props.chosenColour)?.b},1)`,
          }}
        ></View>
        <View
          style={{
            ...styles.component,
            backgroundColor: `rgba(${hexToRgb(props.chosenColour)?.r},${
              hexToRgb(props.chosenColour)?.g
            },${hexToRgb(props.chosenColour)?.b},0.8)`,
            shadowColor: `rgba(${hexToRgb(props.chosenColour)?.r},${
              hexToRgb(props.chosenColour)?.g
            },${hexToRgb(props.chosenColour)?.b},0.8)`,
          }}
        ></View>
        <View
          style={{
            ...styles.component,
            backgroundColor: `rgba(${hexToRgb(props.chosenColour)?.r},${
              hexToRgb(props.chosenColour)?.g
            },${hexToRgb(props.chosenColour)?.b},0.6)`,
            shadowColor: `rgba(${hexToRgb(props.chosenColour)?.r},${
              hexToRgb(props.chosenColour)?.g
            },${hexToRgb(props.chosenColour)?.b},0.6)`,
          }}
        ></View>
        <View
          style={{
            ...styles.component,
            backgroundColor: `rgba(${hexToRgb(props.chosenColour)?.r},${
              hexToRgb(props.chosenColour)?.g
            },${hexToRgb(props.chosenColour)?.b},0.4)`,
            shadowColor: `rgba(${hexToRgb(props.chosenColour)?.r},${
              hexToRgb(props.chosenColour)?.g
            },${hexToRgb(props.chosenColour)?.b},0.4)`,
          }}
        ></View>
        <View
          style={{
            ...styles.component,
            backgroundColor: `rgba(${hexToRgb(props.chosenColour)?.r},${
              hexToRgb(props.chosenColour)?.g
            },${hexToRgb(props.chosenColour)?.b},0.2)`,
            shadowColor: `rgba(${hexToRgb(props.chosenColour)?.r},${
              hexToRgb(props.chosenColour)?.g
            },${hexToRgb(props.chosenColour)?.b},0.2)`,
          }}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 5,
  },
  component: {
    flex: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ColourBar;
