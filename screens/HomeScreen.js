import React, { useState, useLayoutEffect } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { ColorPicker } from "react-native-color-picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import ColourTile from "../components/ColourTile";
import { complementaryColor, triad, analogous} from "../functions/functions";

const HomeScreen = (props) => {
  const [colour, setColour] = useState(false);
  const [chosenColor, setchosenColor] = useState();

  const { navigation } = props;

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
  };

  const resetHandler = () => {
    setColour(false);
  };

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
            <ColourTile
              pressHandler={() => {
                 pressHandler(complementaryColor(chosenColor));
              }}
              chosenColour={complementaryColor(chosenColor)}
              schemeType={"Complementary Color"}
              schemeColor={complementaryColor(chosenColor)}
              /* mainColor={chosenColor} */
            />
            <ColourTile
              pressHandler={() => {
                pressHandler(triad(chosenColor).triad1)
              }}
              chosenColour={triad(chosenColor).triad1}
              schemeType={"Triad 1"}
              schemeColor={triad(chosenColor).triad1}
              /*  mainColor={chosenColor} */
            />
            <ColourTile
              pressHandler={() => {
                pressHandler(triad(chosenColor).triad2)
              }}
              chosenColour={triad(chosenColor).triad2}
              schemeType={"Triad 2"}
              schemeColor={triad(chosenColor).triad2}
              /* mainColor={chosenColor} */
            />
            <ColourTile
              pressHandler={() => {
                pressHandler(analogous(chosenColor).analog1)
              }}
              chosenColour={analogous(chosenColor).analog1}
              schemeType={"Analogous 1"}
              schemeColor={analogous(chosenColor).analog1}
              /* mainColor={chosenColor} */
            />
            <ColourTile
              pressHandler={() => {
                pressHandler(analogous(chosenColor).analog2)
              }}
              chosenColour={analogous(chosenColor).analog2}
              schemeType={"Analogous 2"}
              schemeColor={analogous(chosenColor).analog2}
              /* mainColor={chosenColor} */
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
  },
});

export default HomeScreen;
