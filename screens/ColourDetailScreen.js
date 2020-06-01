import React, { useLayoutEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import ColourCard from "../components/ColourCard";
import ColourBar from "../components/ColourBar";
import { rgbString } from "../functions/functions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Snackbar } from "react-native-paper";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import CustomHeaderButton from "../components/HeaderButton";
import { ntc } from "../functions/colorNames";

const ColourDetailScreen = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

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

  const shareHandler = useCallback(() => {
    setIsLoadingVisible(true);

    const pdf = async () => {
      await inputs();
      try {
        await Sharing.shareAsync(filePath.uri);
      } catch (error) {
        alert(error.message);
      }
      setIsLoadingVisible(false);
      setIsVisible(true);
    };
    pdf();
  }, [navigation, route]);

  var hitMe = "";
  const inputs = async () => {
    try {
      for (var i = 0; i < myData.length; i++) {
        hitMe += `<span>accent${i + 1} : ${myData[i].color.toUpperCase()} , //${
          ntc.name(myData[i].color)[1]
        }(${
          ntc.name(myData[i].color)[2] ? "Exactly" : "Approx."
        })  </span><br/>`;
      }
      generateHTML += `${hitMe} } `;
    } catch (error) {
      alert(error.message);
    }

    await createPDF();
  };

  var generateHTML = `<div>
      <span>${name.replace(/ +/g, "")}={</span> <br/>
            <span>primaryColor: ${mainColor.toUpperCase()},// ${
    ntc.name(mainColor)[1]
  } (${ntc.name(mainColor)[2] ? "Exactly" : "Approx."}) </span><br/> 
  
  `;

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
              {ntc.name(mainColor)[1]}
            </Text>
            <Text
              selectable={true}
              style={{ ...styles.mainColorTitles, color: mainColor }}
            >
              ({ntc.name(mainColor)[2] ? "Exactly" : "Approx."})
            </Text>
          </View>
          <View>
            <Text
              selectable={true}
              style={{ ...styles.mainColorTitles, color: mainColor }}
            >
              {mainColor.toUpperCase()}
            </Text>
          </View>
          <View>
            <Text
              selectable={true}
              style={{ ...styles.mainColorTitles, color: mainColor }}
            >
              {rgbString(mainColor)}
            </Text>
          </View>
        </View>
      </View>
      {isLoadingVisible ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : null}
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
    justifyContent: "space-evenly",
    width: "50%",
  },
  mainColorTitles: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default ColourDetailScreen;
