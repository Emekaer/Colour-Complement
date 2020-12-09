import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";

import ColourTile2 from "../components/ColourTile2";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { deleteFavourite, fetchFavourites } from "../store/actions/colors";
import { Snackbar } from "react-native-paper";

const FavouriteScreen = (props) => {
  const favourites = useSelector((state) => state.colors.favourites);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const [isLoadingItem, setIsLoadingItem] = useState(false);

  const dispatch = useDispatch();

  const loadFavourites = useEffect(() => {
    const getFavourites = async () => {
      setIsLoading(true);
      dispatch(fetchFavourites());
      setIsLoading(false);
    };

    getFavourites();
  }, [dispatch, deleteHandler]);

  const deleteHandler = async (title, data) => {
    setIsLoadingItem(true);
    setIsVisible(true);
    dispatch(deleteFavourite({ title, data }));
    setIsLoadingItem(false);
  };

  useEffect(() => {
    props.navigation.addListener("willFocus", loadFavourites);
  }, [loadFavourites]);

  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  if (!isLoading && favourites.length === 0) {
    return (
      <View style={styles.activityIndicator}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          No favourites Found.
        </Text>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          Add some in the Home Screen.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={favourites}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) =>
          isLoadingItem ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="small" color="grey" />
            </View>
          ) : (
            <View>
              <View style={styles.titleContainer}>
                <View style={styles.title}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("ColourDetailScreen", {
                        name: item.name,
                        mainColor: item.title,
                        data: item.data,
                      });
                    }}
                  >
                    <Text
                      selectable={true}
                      style={{ ...styles.titleText, color: item.title }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    deleteHandler(item.title, item.data);
                  }}
                >
                  <View style={styles.icon}>
                    <Ionicons name="ios-close" size={32} color={"#777"} />
                  </View>
                </TouchableOpacity>
              </View>
              <FlatList
                data={item.data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) => (
                  <View style={styles.item}>
                    <ColourTile2
                      chosenColour={item.color}
                      schemeColor={item.color}
                    />
                  </View>
                )}
              />
            </View>
          )
        }
      />
      <Snackbar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        duration={3000}
        style={{ backgroundColor: "grey", borderRadius: 10 }}
      >
        Deleted
      </Snackbar>
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
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FavouriteScreen;
