import {
  SET_COLOR,
  ADD_COLOR,
  ADD_FAV,
  DELETE_FAV,
  ADD_HISTORY,
} from "../actions/colors";
import { Complements } from "../../functions/functionArray";

const initialState = {
  selectedColor: "#FF0000",
  colorArray: [],
  history: [],
  favourites: [],
};

updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR: {
      return {
        ...state,
        selectedColor: action.color,
        colorArray: Complements(action.color),
      };
    }
    case SET_COLOR: {
      const updatedHistory = state.history.concat(action.storedData);
      return {
        ...state,
        history: updatedHistory,
      };
    }
    case ADD_FAV: {
      const updatedFavs = state.favourites.concat(action.storedData);
      console.log(updatedFavs);
      return updateObject(state, { favourites: updatedFavs });
    }
    case DELETE_FAV: {
      const updatedFavs = state.favourites.concat(action.storedData);
      return updateObject(state, { favourites: updatedFavs });
    }
  }
  return state;
};
