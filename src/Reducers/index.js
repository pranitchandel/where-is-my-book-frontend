import { combineReducers } from "redux";
import login from "./loginReducer";
import product from "./productReducer";

export default combineReducers({
  login,
  product,
});
