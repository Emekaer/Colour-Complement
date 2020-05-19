import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const FavouriteScreen = (props) => {
  const favourites = useSelector((state) => state.colors.selectedFavs);
  console.log(favourites);
  return (
    <View style={styles.screen}>
   <Text>{favourites.title}</Text>
      <Text>{favourites.colors}</Text>
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

export default FavouriteScreen;
