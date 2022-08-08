import { useState } from "react";
import { searchItem } from "../../ActionCreators/productActionData";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
const Categories = ({ searchItem }) => {
  const navigate = useNavigate();
  const categoriesArr = [
    {
      name: "Arts",
      imageUrl: "https://www.bookswagon.com/images/icon8.png",
    },
    {
      name: "Biographies",
      imageUrl: "https://www.bookswagon.com/images/icon2.png",
    },
    {
      name: "Literature",
      imageUrl: "https://www.bookswagon.com/images/icon4.png",
    },
    {
      name: "Fiction",
      imageUrl: "https://www.bookswagon.com/images/icon1.png",
    },
    {
      name: "Business",
      imageUrl: "https://www.bookswagon.com/images/icon8.png",
    },
    {
      name: "Medicine",
      imageUrl: "https://www.bookswagon.com/images/icon7.png",
    },
    {
      name: "Science",
      imageUrl: "https://www.bookswagon.com/images/icon2.png",
    },
    {
      name: "Computer",
      imageUrl: "https://www.bookswagon.com/images/icon5.png",
    },
    {
      name: "Lifestyle",
      imageUrl: "https://www.bookswagon.com/images/icon9.png",
    },
    {
      name: "Environment",
      imageUrl: "https://www.bookswagon.com/images/icon5.png",
    },
  ];
  const handleClick = (category) => {
    searchItem("genre", category, navigate);
  };

  const categoryArr = categoriesArr.map((category, key) => (
    <div
      onClick={() => handleClick(category.name)}
      className="category"
      key={key}
    >
      <div className="categoryName">{category.name}</div>
      <img
        src={category.imageUrl}
        alt="image"
        style={{ height: "80%", width: "80%" }}
      />
    </div>
  ));

  return (
    <div className="landingCategories">
      {categoryArr}
      {categoryArr}
    </div>
  );
};

Categories.propTypes = {
  searchItem: PropTypes.func.isRequired,
};

export default connect(null, { searchItem })(Categories);
