import { SET_COLOR, RESET_COLOR } from "../actions/colors";

const initialState = {
  selectedColor: ["#FF0000"],
};

const colorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return {
        ...state,
        selectedColor: [action.color],
      };
    case RESET_COLOR:
      return {
        selectedColor: [],
      };
    default:
      
      return state;
  }
};    

export default colorsReducer;
