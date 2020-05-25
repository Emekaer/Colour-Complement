export const SET_COLOR = "SET_COLOR";
export const ADD_COLOR = "ADD_COLOR";
export const ADD_FAV = "ADD_FAV";
import { AsyncStorage } from "react-native";

export const setColor = (color) => {
  return { type: SET_COLOR, color: color };
};

export const addColor = ({ title, color }) => {
  return { type: ADD_COLOR, title: title, color: color };
};

export const addFavourite = ({ title, data }) => {
  return async (dispatch) => {
    const newFav = { title: title, data: data };
    const favourites = await AsyncStorage.getItem("favourites");

    const transformedData = (await JSON.parse(favourites)) || "[]";
    transformedData.push(newFav);
    AsyncStorage.setItem("favourites", JSON.stringify(transformedData));

    await dispatch({
      type: ADD_FAV,
      storedData: transformedData,
    });
  };
};
