import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";

import ColourTile from "../components/ColourTile";
import { useDispatch } from "react-redux";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { deleteFavourite } from "../store/actions/colors";

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
            <View style={styles.titleContainer}>
              <View style={styles.title}>
                <Text
                  selectable={true}
                  style={{ ...styles.titleText, color: item.title }}
                >
                  {item.title.toUpperCase()}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    deleteFavourite({ title: item.title, data: item.data })
                  );
                }}
              >
                <View style={styles.icon}>
                  <Ionicons name="ios-close" size={32} color={item.title} />
                </View>
              </TouchableOpacity>
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
    textShadowColor: "#666666",
    textShadowRadius: 1,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    flex: 1,
    paddingRight: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FavouriteScreen;
