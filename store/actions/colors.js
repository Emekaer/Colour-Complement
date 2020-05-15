export const SET_COLOR = "SET_COLOR";
export const ADD_COLOR = "ADD_COLOR"

export const setColor = (color) => {
  return { type: SET_COLOR, color: color };
};

export const addColor = ({title,color}) => {
  return { type: ADD_COLOR, title:title,color: color };
};


