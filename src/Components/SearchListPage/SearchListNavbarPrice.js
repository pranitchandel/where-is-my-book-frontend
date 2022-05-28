import * as React from "react";
import { Box, Slider } from "@material-ui/core";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { priceRangeChange } from "../../ActionCreators/productActionData";

const minDistance = 100;

const SearchListNavbarPrice = ({ priceRangeChange }) => {
  const [value2, setValue2] = React.useState([0, 5000]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 5000 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      // sortByChange();
      // discountRangeChange();
      // bindingChange();
      // LanguageChange();
      setValue2(newValue);
    }
  };

  const handleChangeComplete = () => {
    priceRangeChange({ value2, isPriceRangeChanged: true });
  };
  return (
    <div>
      <div className="navBarHeading">Price Range</div>
      <div className="rangeValueContainer">
        <div className="rangeValues">Rs {value2[0]}</div>
        <div className="rangeValues">Rs {value2[1]}</div>
      </div>
      <Box
        className="box"
        sx={{
          width: "70%",
        }}
      >
        <Slider
          min={0}
          max={5000}
          color="secondary"
          getAriaLabel={() => "Minimum distance shift"}
          value={value2}
          onChange={handleChange2}
          onChangeCommitted={handleChangeComplete}
          // valueLabelDisplay="auto"
        />
      </Box>
    </div>
  );
};

SearchListNavbarPrice.propTypes = {
  priceRangeChange: PropTypes.func.isRequired,
};

export default connect(null, { priceRangeChange })(SearchListNavbarPrice);
