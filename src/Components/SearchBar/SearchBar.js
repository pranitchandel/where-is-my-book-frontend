import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";
import barImage from "../../Assets/menu.png";
import closeImage from "../../Assets/close.png";
import { searchItem } from "../../ActionCreators/productActionData";
import { logout, getWishlist } from "../../ActionCreators/loginActionData";
import { connect } from "react-redux";

const SearchBar = ({ searchItem, user, logout, getWishlist, wishlist }) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchValue, setSearchValue] = useState("");
  let [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(wishlist);
    if (user) {
      getWishlist(user.id);
    }
  }, []);
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

  const handleWishlist = () => {
    navigate("/account");
  };

  const handleSearchClick = () => {
    let container = document.getElementById("smallLogoutContainer").style;
    if (openMenu) {
      container.display = "flex";
      container.flexDirection = "column";
      container.justifyContent = "space-evenly";
      document.getElementById("menuBarImg").src = closeImage;
    } else {
      container.display = "none";
      document.getElementById("menuBarImg").src = barImage;
    }
    openMenu = !openMenu;
  };

  const MenuBar = () => {
    return (
      <div className="menuBarContainer">
        {user ? (
          <div className="logoutContainer">
            <span className="user">{user ? user.name : ""}</span>
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
            <button
              className="logoutButton"
              id="wishlistBtn"
              onClick={handleWishlist}
            >
              WL : {wishlist ? wishlist.length : 0}
            </button>
          </div>
        ) : (
          <button className="logoutButton loginButton" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    );
  };

  const MenuBar2 = () => {
    return (
      <div>
        {user ? (
          <div id="smallLogoutContainer">
            <button
              className="logoutButton"
              id="wishlistBtn"
              onClick={handleWishlist}
            >
              WL : {wishlist ? wishlist.length : 0}
            </button>
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div id="smallLogoutContainer">
            <button className="logoutButton loginButton" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    );
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
                // border: "2px solid blue",
                outline: "none",
              }}
            >
              <FormControl hiddenLabel sx={{ width: "90%" }}>
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
      <MenuBar />
      <MenuBar2 />
      <button
        onClick={() => {
          handleSearchClick();
        }}
        className="smallSearchBarMenu"
      >
        <img src={barImage} alt="Imge" id="menuBarImg" />
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  searchItem: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
  getWishlist: PropTypes.func.isRequired,
  wishlist: PropTypes.array,
};
const mapStateToProps = (state) => ({
  user: state.login.user,
  wishlist: state.login.wishlist,
});

export default connect(mapStateToProps, { searchItem, logout, getWishlist })(
  SearchBar
);
