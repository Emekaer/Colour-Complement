import { SET_COLOR, ADD_COLOR } from "../actions/colors";
import { Complements } from "../../functions/functionArray";


const initialState = {
  selectedColor: "#FF0000",
  colorArray: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return {
        selectedColor: action.color,
        colorArray: Complements(action.color)
      };
    case ADD_COLOR:
      return {
        ...state,
        colorArray: state.colorArray.concat({
          title: action.title,
          data: action.color,
        }),
      };
  }
  return state;
};
