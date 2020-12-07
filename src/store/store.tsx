import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";


import colorsReducer from "./reducers/colors";

export const reducers = combineReducers({
  colors: colorsReducer,
});

export const root = createStore(reducers, applyMiddleware(thunk));


export type RootState = ReturnType<typeof reducers>