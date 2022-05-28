import {
  SEARCH_ITEM,
  SELECT_PRODUCT,
  SET_PRICE_RANGE,
  PRICE_RANGE_CHANGE,
  DISCOUNT_RANGE_CHANGE,
  RESET_FILTERS,
  SORT_BY,
} from "../actionTypes";

const initialState = {
  searchKey: "",
  filteredProduct: {},
  searchValue: "",
  status: "",
  minPrice: 0,
  maxPrice: 5000,
  isPriceRangeChanged: false,
  minDiscount: 0,
  maxDiscount: 100,
  isDiscountRangeChanged: false,
  sortByValue: "",
};
const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_ITEM:
      return {
        ...state,
        filteredProduct: payload.result.filteredProduct,
        status: payload.result.msg,
        searchKey: payload.searchKey,
        searchValue: payload.searchValue,
      };
    default: {
      return state;
    }
    case SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
      };
    case SET_PRICE_RANGE:
      return {
        ...state,
        filteredProduct: payload.filteredProducts,
      };
    case PRICE_RANGE_CHANGE:
      return {
        ...state,
        isPriceRangeChanged: payload.isPriceRangeChanged,
        minPrice: payload.value2[0],
        maxPrice: payload.value2[1],
      };

    case DISCOUNT_RANGE_CHANGE:
      return {
        ...state,
        isDiscountRangeChanged: payload.isDiscountRangeChanged,
        minDiscount: payload.value2[0],
        maxDiscount: payload.value2[1],
      };

    case RESET_FILTERS:
      return {
        ...state,
        minDiscount: 0,
        maxDiscount: 100,
        minPrice: 0,
        maxPrice: 5000,
        sortByValue: "",
      };
    case SORT_BY:
      return {
        ...state,
        sortByValue: payload,
      };
  }
};

export default productReducer;
