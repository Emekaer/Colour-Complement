import React from "react";
import { View, StyleSheet, Button, TextInput, Text } from "react-native";

const InputPicker = (props) => {
  return (
    <View style={{...styles.screen, ...props.style}}>
      <View style={styles.inputView}>
        <Text>Hex Value :</Text>
        <TextInput maxLength={6} style={styles.input1} />
      </View>
      <View style={styles.inputView}>
        <Text>RGB Value:</Text>
        <TextInput style={styles.input} maxLength={2} />
        <TextInput style={styles.input} maxLength={2} />
        <TextInput style={styles.input} maxLength={2} />
      </View>
      <Button title="Set Value" />
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
    alignItems: "center"
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1.5,
    marginHorizontal: 10,
    lineHeight: 32,
  },
  input1: {
    lineHeight: 32,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1.5,
    marginHorizontal: 15,
    width: 50
  },
});

export default InputPicker;
