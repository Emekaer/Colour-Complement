import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ColorPicker, fromHsv, HsvColor } from "react-native-color-picker";
import { rgbString } from "../functions/functions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { addColor } from "../store/actions/colors";
import { useDispatch } from "react-redux";
import { HomeStackNavigationProp, AdjustScreenRouteProp } from '../navigation/types';


import CustomHeaderButton from "../components/HeaderButton";
import { Snackbar } from "react-native-paper";


interface IProps {
  route: AdjustScreenRouteProp,
  navigation: HomeStackNavigationProp,


}

const AdjustScreen = (props: IProps) => {
  const oldColor = props.route.params.oldColor;
  const setColor = props.route.params.color;
  const dispatch = useDispatch();

  const [changedColor, setChangedColor] = useState(oldColor);
  const [newColor, setNewColor] = useState(setColor);
  const [isVisible, setIsVisible] = useState(false);


  const { navigation } = props;

  navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Reset" iconName={"md-add"} onPress={saveHandler} />
      </HeaderButtons>
    ),
  });

  const colorChangeHandler = (color: HsvColor) => {
    setChangedColor(fromHsv(color));
    setNewColor(fromHsv(color));
  };

  const saveHandler = () => {
    navigation.navigate("HomeScreen");
    setIsVisible(true);
    dispatch(addColor({ title: "New Color", color: newColor }));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.infoArea}>
        <Text style={styles.text}>HEX CODE</Text>
        <Text selectable={true} style={styles.text}>
          {changedColor.toUpperCase()}
        </Text>
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.text}>RGB</Text>
        <Text selectable={true} style={styles.text}>
          {rgbString(changedColor)}
        </Text>
      </View>

      <ColorPicker
        style={{ flex: 1, flexDirection: "column", height: 200 }}
        oldColor={oldColor}
        defaultColor={setColor}
        onColorChange={(color) => {
          colorChangeHandler(color);
        }}
        onColorSelected={saveHandler}
      />
      <Snackbar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        duration={3000}
        style={{ backgroundColor: "grey", borderRadius: 10, justifyContent: "center", alignItems: "center" }}
      >
        New Colour Added
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  infoArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 100,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: "400",
    fontSize: 23,
  },
});

export default AdjustScreen;
