import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addWishlist,
  deleteFromWishlist,
} from "../../ActionCreators/loginActionData";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const Account = ({ addWishlist, user, wishlist, deleteFromWishlist }) => {
  const [currentSection, setCurrentSection] = useState("My profile");
  const [content, setContent] = useState(<div></div>);
  const [wishlistArray, setWishlistArray] = useState();
  const [currentProd, setCurrentProd] = useState("");
  const [profileDiv, setProfileDiv] = useState(<div></div>);

  const rootUrl = "https://where-is-my-book-services.onrender.com";

  const handleRemove = async (prodId) => {
    console.log(wishlist);
    await deleteFromWishlist(user.id, prodId);
    setCurrentProd(prodId);
  };
  useEffect(() => {
    console.log("useEffect called!!!!");
    async function getUserProfile() {
      let tempDiv = <div></div>;
      axios
        .get(`${rootUrl}/api/users/user/` + user.id)
        .then((res) => {
          tempDiv = (
            <div className="profileContainer">
              <div>
                <span className="profileLabel">Name :</span>
                {res.data.name}
              </div>
              <div>
                <span className="profileLabel">Email:</span> {res.data.email}
              </div>
            </div>
          );
          setProfileDiv(tempDiv);
          setContent(tempDiv);
        })
        .catch((err) => console.log(err));
    }
    getUserProfile();
    setContent(profileDiv);
  }, []);

  useEffect(() => {
    async function getProducts() {
      let tempArray = <div></div>;
      wishlist.map((wish) => {
        axios
          .get(`${rootUrl}/api/products/product/` + wish.productId)
          .then((res) => {
            const tempWish = (
              <div className="wishContainer">
                <div className="imageContainer">
                  <img
                    src={res.data.imageUrl}
                    alt="image"
                    className="accountContentImg"
                    onError={(event) => {
                      event.target.src =
                        "https://www.legacylitbooks.com/wp-content/uploads/2017/07/missingbook.png?fit=480%2C720";
                      event.onerror = null;
                    }}
                  />
                  {res.data.currentDiscount > 0 ? (
                    <div className="accountContentDiscount">
                      {res.data.currentDiscount}%
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div>
                  <div className="accountContentName">{res.data.name}</div>
                  <div className="accountContentAuthor">
                    <span style={{ fontWeight: "bold" }}>Author :</span>{" "}
                    {res.data.author}
                  </div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div>
                      <div className="accountContentPrice">
                        Rs {res.data.price}
                      </div>
                    </div>
                    <div
                      style={{
                        marginLeft: "10px",
                        borderLeft: "2px solid grey",
                        paddingLeft: "10px",
                        width: "200px",
                      }}
                    >
                      <div
                        style={
                          res.data.isReturnable === "true"
                            ? {
                                color: "green",
                                fontFamily: '"Noto Sans", sans-serif',
                                fontSize: "large",
                                marginLeft: 10,
                                marginTop: 5,
                              }
                            : {
                                color: "red",
                                fontFamily: '"Noto Sans", sans-serif',
                                fontSize: "large",
                                marginLeft: 10,
                                marginTop: 5,
                              }
                        }
                      >
                        {res.data.isReturnable === "true"
                          ? "Returnable"
                          : "Not returnable"}
                      </div>
                      <div className="accountContentBinding">
                        <span style={{ fontWeight: "bold" }}>Binding :</span>{" "}
                        {res.data.typeOfBinding}
                      </div>
                      <Box
                        sx={{
                          "& > legend": { mt: 2 },
                        }}
                      >
                        {/* <Typography component="legend">Read only</Typography> */}
                        <Rating
                          name="read-only"
                          value={res.data.rating}
                          readOnly
                        />
                      </Box>
                    </div>
                    <div className="accountContentButtons">
                      <input
                        type="button"
                        value="Buy now"
                        className="accountContentBtn"
                      />
                      <input
                        type="button"
                        value="Remove"
                        className="accountContentBtn"
                        id="accountContentRemoveBtnId"
                        onClick={() => handleRemove(res.data._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );

            tempArray = (
              <div>
                <div>{tempArray}</div>
                <hr />
                {tempWish}
              </div>
            );
            setWishlistArray(tempArray);
            setContent(tempArray);
          })
          .catch((err) => console.log(err));
      });
      setWishlistArray(tempArray);
      setContent(tempArray);
    }
    getProducts();
  }, [currentProd]);

  const handleContent = (section) => {
    if (section === "wishlist") {
      const temp = wishlistArray;
      setContent(temp);
    } else if (section === "address") {
      alert("Address");
      setContent(<div></div>);
    } else {
      setContent(profileDiv);
    }
    setCurrentSection("My " + section);
  };
  return (
    <div>
      <SearchBar />
      <h2>Account</h2>
      <div className="accountContainer">
        <div className="accountSideNavbar">
          <div
            className="accountNavbarContent"
            onClick={() => handleContent("wishlist")}
          >
            My wishlist
          </div>
          <div
            className="accountNavbarContent"
            onClick={() => handleContent("address")}
          >
            My address
          </div>
          <div
            className="accountNavbarContent"
            onClick={() => handleContent("profile")}
          >
            My profile
          </div>
        </div>
        <div className="accountMain">
          <div className="accountMainSectionHeading">{currentSection}</div>
          {content}
        </div>
      </div>
    </div>
  );
};

Account.propTypes = {
  user: PropTypes.object.isRequired,
  addWishlist: PropTypes.func,
  wishlist: PropTypes.array,
  addWishlistMsg: PropTypes.string,
  deleteFromWishlist: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  wishlist: state.login.wishlist,
  addWishlistMsg: state.login.addWishlistMsg,
});
export default connect(mapStateToProps, { addWishlist, deleteFromWishlist })(
  Account
);
