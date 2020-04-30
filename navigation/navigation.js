import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import AdjustScreen from "../screens/AdjustScreen"

const Stack = createStackNavigator();

const HomeStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="AdjustScreen" component={AdjustScreen} />
 
    </Stack.Navigator>
  );
};

export default HomeStack;
