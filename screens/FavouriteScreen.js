import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SectionList,
  Text,
} from "react-native";

import ColourTile from "../components/ColourTile";
import { useSelector, useDispatch } from "react-redux";
import { AsyncStorage } from "react-native";
import { addFavourite } from "../store/actions/colors";

const FavouriteScreen = (props) => {
  const [favourites, setFavourites] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFavourites = async () => {
      const favourites = await AsyncStorage.getItem("favourites");

      const transformedData = JSON.parse(favourites);

      setFavourites(transformedData);
    };

    getFavourites();
  }, [favourites]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={favourites}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View>
            <View style={styles.title}>
              <Text style={{ ...styles.titleText, color: item.title }}>
                {item.title.toUpperCase()}
              </Text>
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
