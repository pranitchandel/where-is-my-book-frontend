import * as React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@material-ui/core";

import PropTypes from "prop-types";

import { setSortByFilter } from "../../ActionCreators/productActionData";
import { connect } from "react-redux";

const SortBy = ({ setSortByFilter }) => {
  const [sortBy, setSortBy] = React.useState("");
  const sortByRef = React.useRef();
  const handleChange = (event) => {
    console.log("Clicked");
    setSortByFilter(event.target.value);
    setSortBy(event.target.value);
  };
  return (
    <div
      style={{
        height: "55%",
        marginLeft: "70%",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <Box
        sx={{
          width: 200,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            ref={sortByRef}
            value={sortBy}
            label="sortBy"
            onChange={handleChange}
          >
            <MenuItem value={"LH"}>Price - Low to High</MenuItem>
            <MenuItem value={"HL"}>Price - High to Low</MenuItem>
            <MenuItem value={"D"}>Discount</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

SortBy.propTypes = {
  setSortByFilter: PropTypes.func.isRequired,
};
export default connect(null, { setSortByFilter })(SortBy);
