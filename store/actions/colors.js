export const SET_COLOR = "SET_COLOR";
export const ADD_COLOR = "ADD_COLOR";
export const ADD_FAV = "ADD_FAV";
export const DELETE_FAV = "DELETE_FAV";
export const ADD_HISTORY = "ADD_HISTORY";
import { AsyncStorage } from "react-native";

export const setColor = (color) => {
  return { type: SET_COLOR, color: color };
};

export const addColor = ({ title, color }) => {
  return { type: ADD_COLOR, title: title, color: color };
};

export const addHistory = (title) => {
  return async (dispatch) => {
    let history = await AsyncStorage.getItem("history");

    if (history === null) {
      await AsyncStorage.setItem("history", JSON.stringify([]));
      history = await AsyncStorage.getItem("history");
    }

    const transformedData = (await JSON.parse(history)) || "[]";

    if (transformedData.length > 9) {
      transformedData.splice(9, 1);
      transformedData.unshift({
        id: Date.now().toLocaleString(),
        data: title,
      });
    } else {
      transformedData.unshift({
        id: Date.now().toLocaleString(),
        data: title,
      });
    }

    AsyncStorage.setItem("history", JSON.stringify(transformedData));
    await dispatch({
      type: ADD_HISTORY,
      storedData: transformedData,
    });
  };
};

export const addFavourite = ({ title, data }) => {
  return async (dispatch) => {
    const newFav = { title: title, data: data };
    let favourites = await AsyncStorage.getItem("favourites");

    if (favourites == null) {
      await AsyncStorage.setItem("favourites", JSON.stringify([]));
      favourites = await AsyncStorage.getItem("favourites");
    }

    const transformedData = (await JSON.parse(favourites)) || "[]";
    transformedData.push(newFav);

    AsyncStorage.setItem("favourites", JSON.stringify(transformedData));
    await dispatch({
      type: ADD_FAV,
      storedData: transformedData,
    });
  };
};

export const deleteFavourite = ({ title, data }) => {
  return async (dispatch) => {
    const deletedFav = { title: title, data: data };
    let favourites = await AsyncStorage.getItem("favourites");

    if (favourites == null) {
      await AsyncStorage.setItem("favourites", JSON.stringify([]));
      favourites = await AsyncStorage.getItem("favourites");
    }

    let transformedData = (await JSON.parse(favourites)) || "[]";

    transformedData = transformedData.filter((data) => {
      return data.title !== deletedFav.title && data.data !== deletedFav.data;
    });

    AsyncStorage.setItem("favourites", JSON.stringify(transformedData));
    await dispatch({
      type: DELETE_FAV,
      storedData: transformedData,
    });
  };
};
