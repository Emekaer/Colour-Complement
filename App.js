import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import AppDrawer from "./navigation/navigation";

import colorsReducer from "./store/reducers/colors";

const reducers = combineReducers({
  colors: colorsReducer,
});

const root = createStore(reducers);

export default function App() {
  return (
    <Provider store={root}>
      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
