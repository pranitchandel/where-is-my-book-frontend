import axios from "axios";
import {
  SEARCH_ITEM,
  SELECT_PRODUCT,
  SET_PRICE_RANGE,
  PRICE_RANGE_CHANGE,
  DISCOUNT_RANGE_CHANGE,
  RESET_FILTERS,
  SORT_BY,
} from "../actionTypes";

const rootUrl = "https://where-is-my-book-services.onrender.com";

export const searchItem =
  (searchKey, searchValue, navigate) => async (dispatch) => {
    console.log(searchKey + " ", searchValue);
    try {
      const res = await axios.get(
        `${rootUrl}/api/products/product` + "?" + searchKey + "=" + searchValue
      );
      dispatch({
        type: SEARCH_ITEM,
        payload: {
          result: res.data,
          searchKey: searchKey,
          searchValue: searchValue,
        },
      });
      navigate("/searchList");
    } catch (err) {
      console.log("Not found " + err);
    }
  };

export const selectProduct = (product, navigate) => (dispatch) => {
  dispatch({
    type: SELECT_PRODUCT,
    payload: product,
  });
  navigate("/productPage");
};

export const setPriceRange = (priceRange) => (dispatch) => {
  dispatch({
    type: SET_PRICE_RANGE,
    payload: priceRange,
  });
};

export const priceRangeChange = (priceChangePayload) => (dispatch) => {
  dispatch({
    type: PRICE_RANGE_CHANGE,
    payload: priceChangePayload,
  });
};

export const discountRangeChange = (discountChangePayload) => (dispatch) => {
  dispatch({
    type: DISCOUNT_RANGE_CHANGE,
    payload: discountChangePayload,
  });
};

export const resetFilters = () => (dispatch) => {
  dispatch({
    type: RESET_FILTERS,
  });
};

export const setSortByFilter = (sortByValue) => (dispatch) => {
  console.log(sortByValue);
  dispatch({
    type: SORT_BY,
    payload: sortByValue,
  });
};
