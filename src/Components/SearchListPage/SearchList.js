import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  selectProduct,
  resetFilters,
} from "../../ActionCreators/productActionData";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import SearchListNavbarPrice from "./SearchListNavbarPrice";
import SearchListNavbarDiscount from "./SearchListNavbarDiscount";
import SortBy from "./SortBy";

import { useEffect, useState } from "react";
const SearchList = ({
  filteredProduct,
  searchKey,
  searchValue,
  selectProduct,
  isPriceRangeChanged,
  isDiscountRangeChanged,
  minDiscount,
  maxDiscount,
  minPrice,
  maxPrice,
  resetFilters,
  sortByValue,
}) => {
  const navigate = useNavigate();
  const [finalSortedSearchedProducts, setFinalSortedSearchedProducts] =
    useState(filteredProduct);
  useEffect(() => {
    let tempArray = [];
    tempArray = filteredProduct.filter((product) => {
      if (
        product.currentDiscount <= maxDiscount &&
        product.currentDiscount >= minDiscount &&
        product.price <= maxPrice &&
        product.price >= minPrice
      ) {
        return product;
      }
    });
    if (sortByValue === "LH") {
      tempArray.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortByValue === "HL") {
      tempArray.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (sortByValue === "D") {
      tempArray.sort((a, b) => {
        return b.currentDiscount - a.currentDiscount;
      });
    }

    setFinalSortedSearchedProducts(tempArray);
  }, [
    minDiscount,
    maxDiscount,
    minPrice,
    maxPrice,
    isDiscountRangeChanged,
    isPriceRangeChanged,
    filteredProduct,
    sortByValue,
  ]);

  useEffect(() => {
    resetFilters();
  }, []);
  const handleProductClick = (product) => {
    selectProduct(product, navigate);
  };
  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <div className="searchListHeadingContainer">
        <div className="searchListHeading" id="searchKey">
          {capitalize(searchKey)}
        </div>
        <div className="searchListHeading" id="searchValue">
          {capitalize(searchValue)}
        </div>
        <SortBy />
      </div>
      <div className="searchListContainer">
        <div className="searchListNavbar">
          <SearchListNavbarPrice />
          <hr />
          <SearchListNavbarDiscount />
        </div>
        <div className="searchListMain">
          {finalSortedSearchedProducts.map((product, key) => (
            <div
              onClick={() => handleProductClick(product)}
              key={key}
              className="searchList"
            >
              <div>
                <img
                  className="searchListImage"
                  src={product.imageUrl}
                  alt="search"
                  onError={(event) => {
                    event.target.src =
                      "https://www.legacylitbooks.com/wp-content/uploads/2017/07/missingbook.png?fit=480%2C720";
                    event.onerror = null;
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: "5px",
                  fontWeight: "lighter",
                  fontFamily: "sans-serif",
                  height: "50px",
                }}
              >
                {product.name}
              </div>
              {product.currentDiscount > 0 ? (
                <div className="discount">{product.currentDiscount}%</div>
              ) : (
                <div></div>
              )}
              <div className="author">{product.author}</div>
              <div> Rs {product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SearchList.propTypes = {
  selectProduct: PropTypes.func.isRequired,
  filteredProduct: PropTypes.array.isRequired,
  searchKey: PropTypes.string,
  searchValue: PropTypes.string,
  isPriceRangeChanged: PropTypes.bool.isRequired,
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  isDiscountRangeChanged: PropTypes.bool.isRequired,
  minDiscount: PropTypes.number.isRequired,
  maxDiscount: PropTypes.number.isRequired,
  resetFilters: PropTypes.func.isRequired,
  sortByValue: PropTypes.string,
};

const mapStateToProps = (state) => ({
  filteredProduct: state.product.filteredProduct,
  searchKey: state.product.searchKey,
  searchValue: state.product.searchValue,
  isPriceRangeChanged: state.product.isPriceRangeChanged,
  minPrice: state.product.minPrice,
  maxPrice: state.product.maxPrice,
  isDiscountRangeChanged: state.product.isDiscountRangeChanged,
  minDiscount: state.product.minDiscount,
  maxDiscount: state.product.maxDiscount,
  sortByValue: state.product.sortByValue,
});
export default connect(mapStateToProps, { selectProduct, resetFilters })(
  SearchList
);
