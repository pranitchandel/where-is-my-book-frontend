import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../Utils/setAuthToken";
import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  USER_LOADED,
  REGISTER_FAILURE,
  SET_CURRENT_USER,
  SET_WISHLIST,
  SET_LOADING,
  CLEAR_ERROR,
  UPDATE_WISHLIST,
} from "../actionTypes";

const rootUrl = "https://where-is-my-book-services.onrender.com";

export const register = (formData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const { name, email, contactNumber, password } = formData;
    const res = await axios.post(`${rootUrl}/api/users/register`, {
      name,
      email,
      contactNumber,
      password,
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    navigate("/login");
  } catch (err) {
    if (err.response.status === 400) {
      dispatch(setLoading(true));
      dispatch({
        type: REGISTER_FAILURE,
        payload: err.response.data.msg,
      });
      dispatch(setLoading(false));
    }
  }
};

export const login = (formData, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  const { email, password } = formData;
  axios
    .post(`${rootUrl}/api/users/login`, {
      email,
      password,
    })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(setLoading(false));
      navigate("/");
    })
    .catch((err) => {
      if (err.response.status === 404 || err.response.status === 400) {
        dispatch(setLoading(true));
        dispatch({
          type: LOGIN_FAILURE,
          payload: err.response.data.msg,
        });
        dispatch(setLoading(false));
      }
    });
};
export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};

export const logout = (navigate) => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  navigate("/");
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
export const addWishlist =
  ({ userId, prodId }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        `${rootUrl}/api/users/addWishlist/` + userId + "/" + prodId
      );
      dispatch({
        type: SET_WISHLIST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
export const deleteFromWishlist = (userId, prodId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${rootUrl}/api/users/deleteFromWishlist/` + userId + "/" + prodId
    );
    console.log(res.data);
    dispatch({
      type: SET_WISHLIST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getWishlist = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${rootUrl}/api/users/getWishlist/` + userId);
    console.log(res.data);
    dispatch({
      type: SET_WISHLIST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
