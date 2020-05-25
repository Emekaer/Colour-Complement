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
  return (
    <View style={styles.screen}>
      <FlatList
        data={favourites}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View>
            <View style={styles.title}>
              <Text  style={{...styles.titleText,color: item.title }}>{item.title.toUpperCase()}</Text>
            </View>
            <FlatList
              data={item.data}
              horizontal
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index }) => (
                <View style={styles.item}>
                  <ColourTile
                    /*  pressHandler={() => {
                pressHandler(item.data);
              }}
              selection={() => selectionHandler(item.data)} */
                    chosenColour={item.color}
                    schemeType={item.color}
                    schemeColor={item.color}
                  />
                </View>
              )}
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
   titleText: {
    fontSize: 32,
    textAlign: "center",
  },
 title: {
    width: "100%",
  },
});

export default FavouriteScreen;
