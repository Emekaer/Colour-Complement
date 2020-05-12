import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import AppDrawer from "./navigation/navigation";

import colorsReducer from "./store/reducers/colors";

const reducers = combineReducers({
  colors: colorsReducer,
});

const root = createStore(reducers,applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={root}>
      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </Provider>
  );
}

