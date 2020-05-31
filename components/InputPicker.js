import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Button, TextInput, Text, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../store/actions/colors";
import { rgbToHex, hexToRgb } from "../functions/functions";
import MyButton from "./MyButton";

const InputPicker = (props) => {
  let selectedColor = useSelector(
    (state) => state.colors.selectedColor
  ).toUpperCase();

  const pickedColor = props.selectedColor;

  useEffect(() => {
    if (selectedColor != pickedColor) {
      selectedColor = pickedColor;
      setChosenColor(pickedColor)
      setChosenRGB(hexToRgb(pickedColor))
    }
  }, [selectedColor, pickedColor]);

  const selectedRGB = hexToRgb(selectedColor);
  const [chosenColor, setChosenColor] = useState(selectedColor);
  const [chosenRGB, setChosenRGB] = useState(selectedRGB);

  const dispatch = useDispatch();

  const setColourHandlerHex = () => {
    if ( chosenColor.length !== 7  && /^#[0-9A-F]{6}$/i.test(`${chosenColor}`)) {
      Alert.alert("Incorrect input", "Please enter a complete HEX Value. e.g #FFFFFF or #111111");
      return;
    }
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
        <Text>Hex:</Text>
        <TextInput
          maxLength={7}
          style={styles.input1}
          autoCapitalize="characters"
          defaultValue={chosenColor}
          value={chosenColor.toUpperCase()}
          onChangeText={(value) => setChosenColor(value)}
        />
        <MyButton disabled={props.disabled} title="Set Value" onPress={setColourHandlerHex} />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>RGB:</Text>
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
        <MyButton disabled={props.disabled} title="Set Value" onPress={setColourHandlerRGB} />
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
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
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
