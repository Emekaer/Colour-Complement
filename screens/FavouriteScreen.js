import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, SectionList, Text } from "react-native";

import ColourTile from "../components/ColourTile";
import { useDispatch, useSelector } from "react-redux";

const FavouriteScreen = (props) => {
  const favourites = useSelector((state) => state.colors.selectedFavs);
  console.log(favourites);
  return (
    <View style={styles.screen}>
    <SectionList
       /*  contentContainerStyle={styles.selectArea}
        scrollEnabled={true}*/
        numColumns={2} 
        sections={favourites}
        keyExtractor={(item,index) => item + index}
        renderItem={({ item }) => 
     (
          <ColourTile
           /*  pressHandler={() => {
              pressHandler(item.data);
            }}
            selection={() => selectionHandler(item.data)} */
            chosenColour={item}
            schemeType={item}
            schemeColor={item}
          />
        )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  }, selectArea: {
    paddingHorizontal: 26,
  },header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
});

export default FavouriteScreen;
