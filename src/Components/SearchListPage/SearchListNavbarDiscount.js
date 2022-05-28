import * as React from "react";
import { Box, Slider } from "@material-ui/core";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { discountRangeChange } from "../../ActionCreators/productActionData";

const minDistance = 10;

const SearchListNavbarDiscount = ({ discountRangeChange }) => {
  const [value2, setValue2] = React.useState([0, 100]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
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
    discountRangeChange({ value2, isDiscountRangeChanged: true });
  };
  return (
    <div>
      <div className="navBarHeading">Discount Range</div>
      <div className="rangeValueContainer">
        <div className="rangeValues">{value2[0]}%</div>
        <div className="rangeValues">{value2[1]}%</div>
      </div>
      <Box
        className="box"
        sx={{
          width: "70%",
        }}
      >
        <Slider
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

SearchListNavbarDiscount.propTypes = {
  discountRangeChange: PropTypes.func.isRequired,
};

export default connect(null, { discountRangeChange })(SearchListNavbarDiscount);
