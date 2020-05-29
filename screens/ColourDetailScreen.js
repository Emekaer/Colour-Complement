import React, { useLayoutEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import ColourCard from "../components/ColourCard";
import ColourBar from "../components/ColourBar";
import { rgbString } from "../functions/functions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Snackbar } from "react-native-paper";

import CustomHeaderButton from "../components/HeaderButton";

const ColourDetailScreen = (props) => {
  const mainColor = props.route.params.mainColor;
  const myData = props.route.params.data;
  const name = props.route.params.name;

  const { navigation } = props;
  const { route } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="back"
            iconName={"md-arrow-back"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="back"
            iconName={"md-share"}
            onPress={() => {
              console.log("Share");
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, route, name, myData, mainColor]);

  return (
    <View style={styles.screen}>
      <View style={styles.mainColor}>
        <ColourCard chosenColour={mainColor} />
        <View style={styles.mainColorText}>
          <View>
            <Text
              selectable={true}
              style={{ ...styles.mainColorTitles, color: mainColor }}
            >
              {mainColor.toUpperCase()}
            </Text>
          </View>
          <View style={styles.mainColorTextContainer}>
            <Text
              selectable={true}
              style={{ ...styles.mainColorTitles, color: mainColor }}
            >
              {rgbString(mainColor)}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ height: 40 }}>
        <ColourBar chosenColour={mainColor} data={null}></ColourBar>
      </View>
      <FlatList
        data={myData}
        keyExtractor={(item, index) => item.color + index}
        renderItem={({ item }) => (
          <ColourBar data={true} chosenColour={item.color} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  mainColor: {
    flexDirection: "row",
  },
  mainColorText: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  mainColorTextContainer: {
    marginTop: 20,
  },
  mainColorTitles: {
    fontSize: 24,
    fontWeight: "400",
  },
});

export default ColourDetailScreen;
