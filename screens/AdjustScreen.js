import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const AdjustScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is the AdjustScreen</Text>
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

export default AdjustScreen;
