import { SET_COLOR, ADD_COLOR, ADD_FAV } from "../actions/colors";
import { Complements } from "../../functions/functionArray";

const initialState = {
  selectedColor: "#FF0000",
  colorArray: [],
  history: [],
  selectedFavs: [
    {
      title: "#FF0000",
      data: ["#00ff44", "#4992f0", "#ff0000", "#232394", "#00ff44", "#4992f0"],
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR:
      const updatedHistory = [...state.history];
      if (updatedHistory.length > 9) {
        updatedHistory.splice(9, 1);
        updatedHistory.unshift({
          id: Date.now().toLocaleString(),
          data: action.color,
        });

        return {
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
          selectedColor: action.color,
          colorArray: Complements(action.color),
          history: updatedHistory,
        };
      }

    case ADD_COLOR:
      return {
        ...state,
        colorArray: state.colorArray.unshift({
          title: action.title,
          data: action.color,
        }),
      };
    case ADD_FAV:
      console.log(action.selected.colors + "colors");
      return {
        ...state,
        selectedFavs: action.selected,
      };
  }
  return state;
};
