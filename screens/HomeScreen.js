import React, { useState, useLayoutEffect } from "react";
import { ScrollView, View, StyleSheet, Text, FlatList } from "react-native";
import {
  complementaryColor,
  triad,
  analogous,
  tetradic,
  monoch,
} from "../functions/functions";
import { ColorPicker } from "react-native-color-picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import ColourTile from "../components/ColourTile";
import { useDispatch } from "react-redux";

import { setColor, resetColor } from "../store/actions/colors";

const HomeScreen = (props) => {
  const [colour, setColour] = useState(false);
  const [chosenColor, setchosenColor] = useState();

  const { navigation } = props;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Reset" iconName={"md-refresh"} onPress={resetHandler} />
        </HeaderButtons>
      ),
    });
  }, [navigation, resetHandler]);

  const pressHandler = (color) => {
    navigation.navigate("AdjustScreen", {
      oldColor: chosenColor,
      color: color,
    });
  };

  const setColourHandler = (color) => {
    setColour(true);
    setchosenColor(color);
    dispatch(setColor(chosenColor));
  };

  const resetHandler = () => {
    setColour(false);
    dispatch(resetColor());
  };

  const Complements = [
    {
      title: "Complementary Colour",
      data: complementaryColor(colour ? chosenColor : "#ff0000"),
    },
    {
      title: "Monochromatic 1",
      data: monoch(colour ? chosenColor : "#ff0000").monoch1,
    },
    {
      title: "Monochromatic 2",
      data: monoch(colour ? chosenColor : "#ff0000").monoch2,
    },
    {
      title: "Triad 1",
      data: triad(colour ? chosenColor : "#ff0000").triad1,
    },
    {
      title: "Triad 2",
      data: triad(colour ? chosenColor : "#ff0000").triad2,
    },
    {
      title: "Analogous 1",
      data: analogous(colour ? chosenColor : "#ff0000").analog1,
    },
    {
      title: "Analogous 2",
      data: analogous(colour ? chosenColor : "#ff0000").analog2,
    },
    {
      title: "Tetradic 1",
      data: tetradic(colour ? chosenColor : "#ff0000").tetradic1,
    },
    {
      title: "Tetradic 2",
      data: tetradic(colour ? chosenColor : "#ff0000").tetradic2,
    },
    {
      title: "Tetradic 3",
      data: tetradic(colour ? chosenColor : "#ff0000").tetradic3,
    },
  ];

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.selectionArea}>
        {colour ? (
          <View style={{ ...styles.pickedColor, backgroundColor: chosenColor }}>
            <Text style={{ color: "white" }}>{chosenColor.toUpperCase()}</Text>
          </View>
        ) : (
          <ColorPicker
            style={{ flex: 1 }}
            onColorSelected={(color) => {
              setColourHandler(color);
            }}
          />
        )}
      </View>
      <View>
        {colour ? (
          <View style={styles.selectArea}>
            <FlatList
              numColumns={2}
              data={Complements}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <ColourTile
                  pressHandler={() => {
                    pressHandler(item.data);
                  }}
                  chosenColour={item.data}
                  schemeType={item.title}
                  schemeColor={item.data}
                  /*  mainColor={chosenColor}  */
                />
              )}
            />
          </View>
        ) : (
          <View>
            <Text>Please Select a colour</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },
  selectionArea: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 200,
    padding: 10,
    marginBottom: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pickedColor: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  selectArea: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 26,
  },
});

export default HomeScreen;
