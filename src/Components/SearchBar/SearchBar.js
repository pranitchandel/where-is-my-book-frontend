import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";
import { searchItem } from "../../ActionCreators/productActionData";
import { logout } from "../../ActionCreators/loginActionData";
import { connect } from "react-redux";

const SearchBar = ({ searchItem, user, logout }) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchValue = (e) => {
    console.log("Enter search key is " + e.target.value);
    setSearchValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    searchItem(searchKey, searchValue, navigate);
  };
  const handleLogout = () => {
    logout(navigate);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landingForm">
      <div className="logo">
        where is my
        <br />
        <span style={{ margin: 25 }}> BOOK</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="searchInputSelect">
          <input
            type="text"
            value={searchValue}
            name={searchKey}
            onChange={handleSearchValue}
            placeholder="Search by Title,Publisher or ISBN"
            required
          />
          <div className="searchSelectContainer">
            <Box
              sx={{
                width: 150,
                maxHeight: 40,
                // border: "2px solid blue",
                outline: "none",
              }}
            >
              <FormControl
                hiddenLabel
                sx={{ width: "100%", position: "relative" }}
              >
                <InputLabel
                  sx={{
                    top: searchKey === "" ? -10 : -2,
                  }}
                >
                  sort by
                </InputLabel>
                <Select
                  sx={{ height: 35, width: 150 }}
                  value={searchKey}
                  label="Search by"
                  onChange={(e) => setSearchKey(e.target.value)}
                  required
                >
                  <MenuItem value={"name"}>Title</MenuItem>
                  <MenuItem value={"genre"}>Genre</MenuItem>
                  <MenuItem value={"author"}>Author</MenuItem>
                  <MenuItem value={"language"}>Language</MenuItem>
                  <MenuItem value={"isbn"}>ISBN</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div>
            <button className="searchButton" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
      {user ? (
        <div>
          <div>
            <p className="user">{user ? user.name : ""}</p>
          </div>
          <button className="logoutButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button className="logoutButton" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  searchItem: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
};
const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps, { searchItem, logout })(SearchBar);
