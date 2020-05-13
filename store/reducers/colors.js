import { SET_COLOR } from "../actions/colors";

const initialState = {
  selectedColor: "#FF0000",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return {
        selectedColor: action.color,
      };
  }
  return state;
};
