import { SET_COLOR, ADD_COLOR, ADD_FAV } from "../actions/colors";
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
      const updatedHistory = [...state.history];
      if (updatedHistory.length > 9) {
        updatedHistory.splice(9, 1);
        updatedHistory.unshift({
          id: Date.now().toLocaleString(),
          data: action.color,
        });

        return {
          ...state,
          selectedColor: action.color,
          colorArray: Complements(action.color),
          history: updatedHistory,
        };
      } else {
        updatedHistory.unshift({
          id: Date.now().toLocaleString(),
          data: action.color,
        });
        return {
          ...state,
          selectedColor: action.color,
          colorArray: Complements(action.color),
          history: updatedHistory,
        };
      }
    }
    case ADD_COLOR: {
      const updatedColorArray = state.colorArray.concat({
        title: action.title,
        data: action.color,
      });
      return updateObject(state, { colorArray: updatedColorArray });
    }
    case ADD_FAV: {
      const updatedFavs = state.favourites.concat(action.storedData);
      console.log(updatedFavs);
      return updateObject(state, { favourites: updatedFavs });
    }
  }
  return state;
};


