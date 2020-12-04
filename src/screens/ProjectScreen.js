import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const ProjectScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is the ProjectScreen</Text>
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

export default ProjectScreen;
