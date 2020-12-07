import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerScreenProps } from "@react-navigation/drawer";
import AdjustScreen from "../screens/AdjustScreen";

type HomeStackParamList = {
  HomeScreen: { historyColor: string } | undefined;
  AdjustScreen: { oldColor: string; color: string;} 
};

export type HomeStackNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "HomeScreen"
>;

export type HomeScreenRouteProp = RouteProp<HomeStackParamList, "HomeScreen">;

export type AdjustScreenRouteProp = RouteProp<
  HomeStackParamList,
  "AdjustScreen"
>;
