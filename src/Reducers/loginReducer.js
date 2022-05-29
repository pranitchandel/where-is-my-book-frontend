import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  USER_LOADED,
  REGISTER_FAILURE,
  SET_CURRENT_USER,
  SET_WISHLIST,
} from "../actionTypes";

import isEmpty from "../Utils/isEmpty";
const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};
const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: payload,
        isAuthenticated: false,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        errorMessage: "",
        loading: false,
      };
    case REGISTER_FAILURE: {
      return {
        ...state,
        errorMessage: payload,
        isRegistered: false,
        loading: false,
      };
    }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
      };

    case SET_WISHLIST: {
      return { ...state, wishlist: payload };
    }
    default:
      return state;
  }
};

export default loginReducer;
