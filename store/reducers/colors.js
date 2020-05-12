import { SET_COLOR, RESET_COLOR } from "../actions/colors";

const initialState = {
  selectedColor: "#FF0000",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return {
        selectedColor: action.color,
      };

    case RESET_COLOR:
      return {
        selectedColor: "FF0000",
      };
    default:
      return state;
  }
};
