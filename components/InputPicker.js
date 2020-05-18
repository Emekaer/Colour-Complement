import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Button, TextInput, Text, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../store/actions/colors";
import { rgbToHex, hexToRgb } from "../functions/functions";
import MyButton from "./MyButton";

const InputPicker = (props) => {
  const selectedColor = useSelector(
    (state) => state.colors.selectedColor
  ).toUpperCase();
  const selectedRGB = hexToRgb(selectedColor);
  const [chosenColor, setChosenColor] = useState(selectedColor);
  const [chosenRGB, setChosenRGB] = useState(selectedRGB);

  const dispatch = useDispatch();

  const setColourHandlerHex = () => {
    dispatch(setColor(chosenColor));
    setChosenRGB(hexToRgb(chosenColor));
    props.submitHandler(chosenColor);
  };

  const setColourHandlerRGB = () => {
    if (+chosenRGB.r > 255 || +chosenRGB.g > 255 || +chosenRGB.b > 255) {
      Alert.alert("Incorrect input", "Please enter a number from 0-255");
      return;
    }
    setChosenColor(rgbToHex(+chosenRGB.r, +chosenRGB.g, +chosenRGB.b));
    dispatch(setColor(rgbToHex(+chosenRGB.r, +chosenRGB.g, +chosenRGB.b)));
    props.submitHandler(rgbToHex(+chosenRGB.r, +chosenRGB.g, +chosenRGB.b));
  };

  return (
    <View style={{ ...styles.screen, ...props.style }}>
      <View style={styles.inputView}>
        <Text>Hex Value :</Text>
        <TextInput
          maxLength={7}
          style={styles.input1}
          autoCapitalize="characters"
          defaultValue={selectedColor}
          value={chosenColor.toUpperCase()}
          onChangeText={(value) => setChosenColor(value)}
        />
        <MyButton title="Set Value" onPress={setColourHandlerHex} />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>RGB Value:</Text>
        <Text>R:</Text>
        <TextInput
          style={styles.input}
          maxLength={3}
          min={0}
          max={255}
          keyboardType="number-pad"
          defaultValue={`${selectedRGB.r}`}
          value={`${chosenRGB.r}`}
          onChangeText={(value) => {
            setChosenRGB({ r: value, g: chosenRGB.g, b: chosenRGB.b });
          }}
        />
        <Text>G:</Text>
        <TextInput
          style={styles.input}
          maxLength={3}
          min={0}
          max={255}
          keyboardType="number-pad"
          defaultValue={`${selectedRGB}`}
          value={`${chosenRGB.g}`}
          onChangeText={(value) =>
            setChosenRGB({ r: chosenRGB.r, g: value, b: chosenRGB.b })
          }
        />
        <Text>B:</Text>
        <TextInput
          style={styles.input}
          maxLength={3}
          min={0}
          max={255}
          keyboardType="number-pad"
          defaultValue={`${selectedRGB}`}
          value={`${chosenRGB.b}`}
          onChangeText={(value) =>
            setChosenRGB({ r: chosenRGB.r, g: chosenRGB.g, b: value })
          }
        />
        <MyButton title="Set Value" onPress={setColourHandlerRGB} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  inputView: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1.5,
    marginHorizontal: 10,
    lineHeight: 25,
    width: 30,
    textAlign: "center",
  },
  input1: {
    lineHeight: 32,
    borderColor: "#ccc",
    borderWidth: 1.5,
    lineHeight: 25,
    marginHorizontal: 15,
    textAlign: "center",
    width: 65,
  },
  label: {
    marginRight: 12,
  },
});

export default InputPicker;
