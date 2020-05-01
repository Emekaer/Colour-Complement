import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import AdjustScreen from "../screens/AdjustScreen";

const Stack = createStackNavigator();

const defaultNavOps = {
  headerStyle: {
    backgroundColor: "grey",
  },
  headerTitleAlign: "center",
  headerTitleStyle: {
    color: "white",
    marginTop: 20,
  },
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOps}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={(navData) => {
          return {
            headerTitle: "Colour Complements",
          };
        }}
      />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="AdjustScreen" component={AdjustScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
