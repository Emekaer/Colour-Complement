import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, Share, Button } from "react-native";
import ColourCard from "../components/ColourCard";
import ColourBar from "../components/ColourBar";
import { rgbString } from "../functions/functions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Snackbar } from "react-native-paper";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import CustomHeaderButton from "../components/HeaderButton";

const ColourDetailScreen = (props) => {
  const [isVisible, setIsVisible] = useState(false);

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
          <Item title="back" iconName={"md-share"} onPress={shareHandler} />
        </HeaderButtons>
      ),
    });
  }, [navigation, route, name, myData, mainColor]);

  const shareHandler = async () => {
    await createPDF();
    try {
      await Sharing.shareAsync(filePath.uri);
    } catch (error) {
      alert(error.message);
    }
    setIsVisible(true);
  };

  const generateHTML = (
    `<div>
      <span>${name}</span> <br/>
            <span>Main Colour ${mainColor} </span><br/>
            <span>Colour ${1} : ${myData[0].color}</span><br/>
            <span>Colour ${2} : ${myData[1].color}</span><br/>
            <span>Colour ${3} : ${myData[2].color}</span><br/>

</div>`)
  

  let filePath;
  const createPDF = async () => {
    filePath = await Print.printToFileAsync({
      html: generateHTML,
      width: 612,
      height: 792,
      base64: false,
    });
   
  };

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
      <Snackbar
      visible={isVisible}
      onDismiss={() => setIsVisible(false)}
      duration={3000}
      style={{ backgroundColor: "grey", borderRadius: 10 }}
    >
      {name} has been shared.
    </Snackbar>
 
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
