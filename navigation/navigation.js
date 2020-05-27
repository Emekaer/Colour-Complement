import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import HomeScreen from "../screens/HomeScreen";
import AdjustScreen from "../screens/AdjustScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProjectScreen from "../screens/ProjectScreen";
import ColourDetailScreen from "../screens/ColourDetailScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
            headerTitle: "Schemes",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={"md-menu"}
                  onPress={() => {
                    navData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <Stack.Screen
        name="AdjustScreen"
        component={AdjustScreen}
        options={(navData) => {
          return {
            headerTitle: "Adjust Colour",
          };
        }}
      />
    </Stack.Navigator>
  );
};

const HistoryStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOps}>
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={(navData) => {
          return {
            headerTitle: "History",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={"md-menu"}
                  onPress={() => {
                    navData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
    </Stack.Navigator>
  );
};

const FavouriteStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOps}>
      <Stack.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={(navData) => {
          return {
            headerTitle: "Favourites",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={"md-menu"}
                  onPress={() => {
                    navData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <Stack.Screen name="ColourDetailScreen" component={ColourDetailScreen} 
      options={(navData) => {
        return {
          headerTitle: "Colour Details",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="back"
                iconName={"md-arrow-back"}
                onPress={() => {
                  navData.navigation.goBack();
                }}
              />
            </HeaderButtons>
          ),headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="back"
                iconName={"md-share"}
                onPress={() => {
                  console.log("Share")
                }}
              />
            </HeaderButtons>
          )
        };
      }}/>
    </Stack.Navigator>
  );
};

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: "grey", width: "40%" }}
      drawerContentOptions={{
        activeBackgroundColor: "black",
        activeTintColor: "white",
        marginTop: 30,
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="History" component={HistoryStack} />
      <Drawer.Screen name="Favourites" component={FavouriteStack} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
