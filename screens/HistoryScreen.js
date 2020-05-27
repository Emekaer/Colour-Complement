import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";

import { setColor } from "../store/actions/colors";

const HistoryScreen = (props) => {
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const gethistory = async () => {
      const history = await AsyncStorage.getItem("history");

      const transformedData = JSON.parse(history);

      setHistory(transformedData);
    };

    gethistory();
  }, [history]);

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
                props.navigation.navigate("HomeScreen",{historyColor : item.data});
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
    marginTop: 5,
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
});

export default HistoryScreen;
