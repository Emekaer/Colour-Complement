import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SectionList,
  Text,
} from "react-native";

import ColourTile from "../components/ColourTile";
import { useSelector } from "react-redux";

const FavouriteScreen = (props) => {
  const favourites = useSelector((state) => state.colors.favourites);
  console.log(favourites);
  return (
    <View style={styles.screen}>
      <SectionList
        sections={favourites}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header1}>
            <Text style={styles.header}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <ColourTile
              /*  pressHandler={() => {
            pressHandler(item.data);
          }}
          selection={() => selectionHandler(item.data)} */
              chosenColour={item}
              schemeType={item}
              schemeColor={item}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  item: {},
  header: {
    fontSize: 32,
    color: "white",
    textAlign: "center",
  },
  header1: {
    width: "100%",
    backgroundColor: "grey",
  },
});

export default FavouriteScreen;
