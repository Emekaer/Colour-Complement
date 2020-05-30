import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { ColorPicker } from "react-native-color-picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Snackbar } from "react-native-paper";

import CustomHeaderButton from "../components/HeaderButton";
import ColourTile from "../components/ColourTile";
import InputPicker from "../components/InputPicker";
import { useDispatch, useSelector } from "react-redux";
import Swiper from "react-native-swiper";

import { setColor, addFavourite, addHistory } from "../store/actions/colors";
import MyButton from "../components/MyButton";

const HomeScreen = (props) => {
  const selectedColor = useSelector((state) => state.colors.selectedColor);
  const Complements = useSelector((state) => state.colors.colorArray);
  const [selectedColors, setSelectedColors] = useState([]);
  const [colour, setColour] = useState(false);
  const [chosenColor, setChosenColor] = useState(selectedColor);
  const [isVisible, setIsVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [picked, setPicked] = useState(selected);
  const [projectName, setProjectName] = useState(chosenColor.toUpperCase());
  const [selectionMode, setSelectionMode] = useState(false);

  const dispatch = useDispatch();

  const { navigation } = props;
  const { route } = props;

  const historyColor = route.params?.historyColor;

  useEffect(() => {
    if (historyColor !== undefined) {
      setChosenColor(historyColor);
      setColour(true);
    }
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Favourite"
            iconName={"md-add"}
            show={colour ? "always" : "never"}
            colour={selectedColors.length === 0 ? "#aaa" : "white"}
            onPress={() => {
              setIsAddMode(true);
              setProjectName(chosenColor.toUpperCase());
            }}
          />
          <Item
            title="multiadd"
            iconName={"md-add"}
            show={colour ? "always" : "never"}
            colour={selectionMode ? "#aaa" : "white"}
            onPress={() => {
              setSelectionMode(!selectionMode);
            }}
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
    Complements,
    selectionMode,
    pressHandler,
  ]);

  const pressHandler = (color) => {
    if (selectionMode) {
      selectionHandler(color);
    } else {
      navigation.navigate("AdjustScreen", {
        oldColor: selectedColor,
        color: color,
      });
    }
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
    setPicked(selected);
  }, [selectedColors, chosenColor]);

  const favDispathcer = () => {
    setIsVisible(true);
    resetHandler();
    setIsAddMode(false);
    dispatch(
      addFavourite({
        name: projectName,
        title: picked.title,
        data: picked.data,
      })
    );
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

  if (colour) {
    selectPane = (
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
    );
  } else {
    selectPane = (
      <ColorPicker
        style={{ flex: 1 }}
        defaultColor={selectedColor}
        onColorSelected={(color) => {
          setColourHandler(color);
        }}
      />
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
            selectionMode={selectionMode}
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
        <Text style={styles.someText}>Please Select a colour</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.selectionArea}>
        <Swiper
          scrollEnabled={colour ? true : false}
          showsButtons={true}
          showsPagination={false}
          nextButton={<Text style={styles.buttonText}>›</Text>}
          prevButton={<Text style={styles.buttonText}>‹</Text>}
        >
          {selectPane}
          <View style={styles.selectionArea}>
            <InputPicker
              selectedColor={chosenColor}
              submitHandler={(color) => setColourHandler(color)}
            />
          </View>
        </Swiper>
      </View>
      <Modal visible={isAddMode} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.someText}>Name of Project</Text>
          <TextInput
            style={styles.input}
            defaultValue={projectName}
            onChangeText={(value) => {
              setProjectName(value);
            }}
          />
          <View style={styles.modalButtons}>
            <MyButton title="Save" onPress={favDispathcer} />
            <MyButton
              title="Cancel"
              onPress={() => {
                setIsAddMode(false);
              }}
            />
          </View>
        </View>
      </Modal>
      {selectedArea}
      <Snackbar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        duration={3000}
        style={{ backgroundColor: "grey", borderRadius: 10 }}
      >
        Added {projectName} to Favourites.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    textShadowColor: "#666",
    textShadowRadius: 1,
  },
  buttonText: {
    fontSize: 50,
    color: "white",
    textShadowColor: "#666",
    textShadowRadius: 1,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1.5,
    marginVertical: 10,
    lineHeight: 25,
    width: "80%",
    textAlign: "center",
  },
  someText: { fontSize: 30, color: "#777" },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "80%",
    marginVertical: 20,
  },
});

export default HomeScreen;
