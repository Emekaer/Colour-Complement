import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { ColorPicker } from "react-native-color-picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Snackbar } from "react-native-paper";

import CustomHeaderButton from "../components/HeaderButton";
import ColourTile from "../components/ColourTile";
import InputPicker from "../components/InputPicker";
import { useDispatch, useSelector } from "react-redux";

import { setColor, addFavourite, addHistory } from "../store/actions/colors";

const HomeScreen = (props) => {
  const selectedColor = useSelector((state) => state.colors.selectedColor);
  const Complements = useSelector((state) => state.colors.colorArray);
  const [selectedColors, setSelectedColors] = useState([]);
  const [colour, setColour] = useState(false);
  const [chosenColor, setChosenColor] = useState(selectedColor);
  const [mode, setMode] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const { navigation } = props;
  const { route } = props;

  const historyColor = route.params?.historyColor;

  useEffect(() => {
    if (historyColor !== undefined) {
      setChosenColor(historyColor)
      setColour(true);
    }
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Mode change"
            iconName={"md-swap"}
            onPress={modeChangeHandler}
            show={colour ? "never" : "always"}
          />
          <Item
            title="Favourite"
            iconName={"md-star"}
            show={colour ? "always" : "never"}
            colour={selectedColors.length === 0 ? "#aaa" : "white"}
            onPress={favDispathcer}
          />
          <Item
            title="Reset"
            show={colour ? "always" : "never"}
            iconName={"md-refresh"}
            onPress={resetHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [
    navigation,
    resetHandler,
    route.params,
    chosenColor,
    selectedColor,
    selectedColors,
    selected,
  ]);

  const pressHandler = (color) => {
    navigation.navigate("AdjustScreen", {
      oldColor: selectedColor,
      color: color,
    });
  };

  const selectionHandler = (value) => {
    if (selectedColors.some((hue) => hue.color == value)) {
      const repeatedColor = selectedColors.find((hue) => hue.color === value);
      setSelectedColors(
        selectedColors.filter((value) => repeatedColor != value)
      );
      return;
    } else {
      setSelectedColors([...selectedColors, { color: value }]);
    }
  };

  let selected;

  useEffect(() => {
    selected = { title: chosenColor, data: selectedColors };
  }, [selectedColors, chosenColor]);

  const favDispathcer = () => {
    setIsVisible(true);
    resetHandler();
    dispatch(addFavourite({ title: selected.title, data: selected.data }));
  };

  const modeChangeHandler = () => {
    setMode((mode) => !mode);
  };

  const setColourHandler = (color) => {
    dispatch(setColor(color));
    dispatch(addHistory(color));
    setChosenColor(color);
    setColour(true);
  };

  const resetHandler = () => {
    setColour(false);
    setSelectedColors([]);
  };

  let selectPane;

  if (mode && colour) {
    selectPane = (
      <View style={styles.selectionArea}>
        <View
          style={{
            ...styles.pickedColor,
            backgroundColor: chosenColor,
            shadowColor: chosenColor,
          }}
        >
          <Text selectable={true} style={styles.selectedText}>
            {selectedColor.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  } else if (mode && !colour) {
    selectPane = (
      <View style={styles.selectionArea}>
        <ColorPicker
          style={{ flex: 1 }}
          defaultColor={selectedColor}
          onColorSelected={(color) => {
            setColourHandler(color);
          }}
        />
      </View>
    );
  } else {
    selectPane = (
      <View style={styles.selectionArea}>
        <InputPicker submitHandler={(color) => setColourHandler(color)} />
      </View>
    );
  }

  let selectedArea;
  if (colour) {
    selectedArea = (
      <FlatList
        contentContainerStyle={styles.selectArea}
        scrollEnabled={true}
        numColumns={2}
        data={Complements}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <ColourTile
            pressHandler={() => {
              pressHandler(item.data);
            }}
            selection={() => selectionHandler(item.data)}
            chosenColour={item.data}
            schemeType={item.title}
            schemeColor={item.data}
          />
        )}
      />
    );
  } else {
    selectedArea = (
      <View style={styles.defaultText}>
        <Text style={{ fontSize: 30 }}>Please Select a colour</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {selectPane}
      {selectedArea}
      <Snackbar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
        duration={3000}
        style={{ backgroundColor: "grey", borderRadius: 10 }}
      >
        Added to Favourites
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },
  selectionArea: {
    flexDirection: "row",
    width: "100%",
    height: 175,
    padding: 10,
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
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  selectArea: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  defaultText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 1.5,
    textShadowColor: "#666666",
    textShadowRadius: 1,
  },
});

export default HomeScreen;
