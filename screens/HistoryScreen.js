import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "react-native-paper";

import { setColor, fetchHistory, clearHistory } from "../store/actions/colors";

const HistoryScreen = (props) => {
  const history = useSelector((state) => state.colors.history);
  const [isVisible, setIsVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Favourite"
            iconName={"md-close"}
            show={history ? "always" : "never"}
            colour={history.length === 0 ? "#aaa" : "white"}
            disabled={history.length === 0 ? true: false}
            onPress={clearAllHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [dispatch, loadHistory,clearAllHandler,history]);

  const clearAllHandler = () => {
    setIsVisible(true);
    dispatch(clearHistory());
  };

  const loadHistory = useEffect(() => {
    const gethistory = async () => {
      setIsLoading(true);
      dispatch(fetchHistory());
      setIsLoading(false);
    };

    gethistory();
  }, [dispatch, clearAllHandler]);

  useEffect(() => {
    navigation.addListener("willFocus", loadHistory);
  }, [loadHistory]);

  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  if (!isLoading && history.length === 0) {
    return (
      <View style={styles.activityIndicator}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          No History Found.
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
        contentContainerStyle={styles.selectArea}
        scrollEnabled={true}
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.selectionArea}>
            <Text style={styles.text}>#{index + 1}</Text>
            <TouchableOpacity
              style={{
                ...styles.pickedColor,
                backgroundColor: item.data,
                shadowColor: item.data,
              }}
              onPress={() => {
                props.navigation.navigate("HomeScreen", {
                  historyColor: item.data,
                });
                dispatch(setColor(item.data));
              }}
            >
              <View>
                <Text selectable={true} style={styles.colorText}>
                  {item.data.toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <Snackbar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        duration={3000}
        style={{ backgroundColor: "grey", borderRadius: 10 }}
      >
        All Cleared
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  selectArea: {
    paddingHorizontal: 2,
  },
  pickedColor: {
    marginRight: 10,
    width: "90%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  selectionArea: {
    flexDirection: "row",
    width: "100%",
    height: 175,
    padding: 10,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1.5,
  },
  text: {
    color: "#777777",
    marginRight: 5,
  },
  colorText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 1.5,
    textShadowColor: "#666666",
    textShadowRadius: 1,
  },
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HistoryScreen;
