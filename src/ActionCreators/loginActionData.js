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
} from "../actionTypes";

export const register = (formData, navigate) => async (dispatch) => {
  try {
    const { name, email, contactNumber, password } = formData;
    const res = await axios.post(
      "https://where-is-my-book-services.onrender.com//api/users/register",
      {
        name,
        email,
        contactNumber,
        password,
      }
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    navigate("/");
  } catch (err) {
    console.log(err.response);
    if (err.response.status === 400) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: err.response.data.msg,
      });
    }
  }
};

export const login = (formData, navigate) => (dispatch) => {
  const { email, password } = formData;
  console.log(formData);
  axios
    .post("https://where-is-my-book-services.onrender.com//api/users/login", {
      email,
      password,
    })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
      navigate("/");
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: err.response.data.msg,
        });
      }
    });
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
