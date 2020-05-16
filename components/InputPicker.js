import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Button, TextInput, Text, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../store/actions/colors";
import { rgbToHex, hexToRgb } from "../functions/functions";

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
    if (
      +chosenRGB.r === "" ||
      +chosenRGB.b === "" ||
      +chosenRGB.g === "" ||
      +chosenRGB.r > 255 ||
      +chosenRGB.g > 255 ||
      +chosenRGB.b > 255
    ) {
      Alert.alert("Incorrect input", "Please enter a number from 0-255");
      return;
    }
    setChosenColor(rgbToHex(+chosenRGB.r, +chosenRGB.g, +chosenRGB.b));
    dispatch(setColor(rgbToHex(+chosenRGB.r, +chosenRGB.g, +chosenRGB.b)));
    props.submitHandler(rgbToHex(+chosenRGB.r, +chosenRGB.g, +chosenRGB.b));
  };

  return (
    <View style={{ ...styles.screen, ...props.style }}>
      <View style={{ ...styles.inputView }}>
        <Text>Hex Value :</Text>
        <TextInput
          maxLength={7}
          style={styles.input1}
          autoCapitalize="characters"
          defaultValue={selectedColor}
          value={chosenColor.toUpperCase()}
          onChangeText={(value) => setChosenColor(value)}
        />
        <Button
          title="Set Value"
          onPress={setColourHandlerHex}
          color={"grey"}
        />
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
        <Button
          title="Set Value"
          onPress={setColourHandlerRGB}
          color={"grey"}
        />
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
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1.5,
    marginHorizontal: 10,
    lineHeight: 32,
    width: 30,
  },
  input1: {
    lineHeight: 32,
    borderColor: "#ccc",
    borderWidth: 1.5,
    marginHorizontal: 15,
    width: 65,
  },
  label: {
    paddingHorizontal: 12,
  },
});

export default InputPicker;
