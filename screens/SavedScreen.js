import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const SavedScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is the SavedScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SavedScreen;
