export const SET_COLOR = "SET_COLOR";
export const ADD_COLOR = "ADD_COLOR";
export const ADD_FAV = "ADD_FAV";

export const setColor = (color) => {
  return { type: SET_COLOR, color: color };
};

export const addColor = ({ title, color }) => {
  return { type: ADD_COLOR, title: title, color: color };
};

export const addFavourite = ( selected)  => {
  return { type: ADD_FAV, selected: selected };
};
