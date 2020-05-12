import React, { useState } from "react";
import { View, StyleSheet, Button, TextInput, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../store/actions/colors";
import { rgbToHex, hexToRgb } from "../functions/functions";

const InputPicker = (props) => {
  const selectedColor = useSelector(
    (state) => state.colors.selectedColor
  ).toUpperCase();
  const [chosenColor, setChosenColor] = useState(selectedColor);
  const [chosenRGB, setChosenRGB] = useState({ r: 255, g: 0, b: 0 });

  const dispatch = useDispatch();
  const selectedRGB = hexToRgb(selectedColor);
  console.log(chosenRGB);

  const setColourHandler = () => {
    dispatch(setColor(chosenColor));
    props.submitHandler(chosenColor);
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
          onChangeText={(value) => setChosenColor(value)}
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
          value={chosenRGB.r}
          onChangeText={(value) => setChosenRGB({r:value,g:chosenRGB.g,b:chosenRGB.b})}
        />
        <Text>G:</Text>
        <TextInput
          style={styles.input}
          maxLength={3}
          min={0}
          max={255}
          keyboardType="number-pad"
          defaultValue={`${selectedRGB.g}`}
          value={chosenRGB.g}
          onChangeText={(value) => setChosenRGB({r:chosenRGB.r,g:value,b:chosenRGB.b})}
        />
        <Text>B:</Text>
        <TextInput
          style={styles.input}
          maxLength={3}
          min={0}
          max={255}
          keyboardType="number-pad"
          defaultValue={`${selectedRGB.b}`}
          value={chosenRGB.b}
          onChangeText={(value) => setChosenRGB({r:chosenRGB.r,g:chosenRGB.g,b:value})}
        />
      </View>
      <Button title="Set Value" onPress={setColourHandler} color={"grey"} />
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
