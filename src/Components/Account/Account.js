import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addWishlist } from "../../ActionCreators/loginActionData";

const Account = ({ addWishlist, user, wishlist }) => {
  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map((wish) => (
          <li>{wish.productId}</li>
        ))}
      </ul>
    </div>
  );
};

Account.propTypes = {
  user: PropTypes.object.isRequired,
  addWishlist: PropTypes.func,
  wishlist: PropTypes.array,
  addWishlistMsg: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  wishlist: state.login.wishlist,
  addWishlistMsg: state.login.addWishlistMsg,
});
export default connect(mapStateToProps, { addWishlist })(Account);
