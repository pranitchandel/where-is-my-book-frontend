import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { addWishlist } from "../../ActionCreators/loginActionData";
const SelectedProduct = ({
  product,
  user,
  addWishlist,
  wishlist,
  addWishlistMsg,
}) => {
  const [disableWishlist, setDisableWishlist] = useState(false);
  useEffect(() => {
    let filteredList = wishlist.filter((wish) => {
      if (wish.productId === product._id) return wish;
    });
    if (filteredList.length >= 1) {
      setDisableWishlist(true);
    }
  }, []);

  const handleAddWishlist = (prodId) => {
    if (user === null) {
      return alert("Please login first");
    }
    console.log(user.id + " " + prodId);
    addWishlist({ userId: user.id, prodId });
    setDisableWishlist(true);
    // navigate("/account");
  };

  return (
    <div>
      <SearchBar />
      <div className="selectedContainer">
        <div className="selectedProductImageContainer">
          <img
            className="selectedProductImage"
            src={product.imageUrl}
            alt="search"
            onError={(event) => {
              event.target.src =
                "https://www.legacylitbooks.com/wp-content/uploads/2017/07/missingbook.png?fit=480%2C720";
              event.onerror = null;
            }}
          />
          {product.currentDiscount > 0 ? (
            <div className="discount">{product.currentDiscount}%</div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="selectedProductContent">
          <div>
            <span className="productName">{product.name}</span> (
            <span>{product.typeOfBinding}</span>) |
            <span style={{ fontWeight: "bold" }}> Released : </span>
            {product.arrivalDate}
          </div>
          <div style={{ marginLeft: 10 }}>
            By :
            <span
              style={{
                fontStyle: "oblique",
                fontSize: "large",
                color: "rgb(167, 1, 1)",
              }}
            >
              {" "}
              {product.author}
            </span>{" "}
            <span style={{ fontFamily: '"Noto Sans", sans-serif' }}></span>{" "}
            (Author)
          </div>
          <div
            style={{
              fontSize: "xxx-large",
              fontFamily: '"Noto Sans", sans-serif',
              marginTop: "40px",
              marginLeft: 10,
            }}
          >
            Rs {product.price}
          </div>
          <div
            style={
              product.isReturnable === "true"
                ? {
                    color: "green",
                    fontFamily: '"Noto Sans", sans-serif',
                    fontSize: "x-large",
                    marginLeft: 10,
                  }
                : {
                    color: "red",
                    fontFamily: '"Noto Sans", sans-serif',
                    fontSize: "x-large",
                    marginLeft: 10,
                  }
            }
          >
            {product.isReturnable === "true" ? "Returnable" : "Not returnable"}
          </div>
          <div className="selectedProductButtons">
            <button
              id="buyBtn"
              className="selectedProductButton"
              onClick={() => {
                alert("Coming soon!!");
              }}
            >
              Buy
            </button>
            <button
              id="addBtn"
              onClick={() => handleAddWishlist(product._id)}
              className="selectedProductButton"
              disabled={disableWishlist}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      <div className="selectedProductAboutContainer">
        <div
          style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: "x-large",
            color: "rgb(167, 1, 1)",
          }}
        >
          About the book
        </div>
        <div className="aboutContent">
          In just 5 weeks, you will come out of Your Mental Health Workout with
          a sharper mind, clearer-decision making skills and greater resilience.
          <br />
          Your Mental Health Workout(TM) provides you with exercises, tools,
          affirmations and expert guidance so you can start looking after your
          mental health for the long term. Zoë Aston, psychotherapist and mental
          <br />
          health consultant to many high-profile individuals, has devised a
          ground-breaking 5-week schedule to help you build mental muscle; she
          incorporates 2 to 3 years of one-to-one therapy in one book. Our
          mental health is just like our physical health; we all have
          psychological weak spots or injuries and, just like physical injury,
          when they get used they may feel tender or uncomfortable. They need to
          be cared for in the right way so they can heal. Zoë's tried-and-tested
          workout plan, which helps to normalise the conversation around mental
          health, is split into weekly and daily sets.
          <br /> The weekly workouts help develop accountability, commitment to
          yourself and others and encourage physical exercise as a form of mood
          management. While your daily workouts move your focus inwards,
          providing space and time for you to look after the integrity of your
          mind through development of healthy self-talk. At the end of the book,
          there is a handy planner so you can easily track your progress. By
          following Zoë's plan you will become stronger, happier and can create
          the internal emotional landscape you want to live in. 'I worked with
          Zoë for 6 months, prior
          <br />
          to which I had always been quite sceptical about whether I would
          benefit from therapy. During that time she helped me to get to know
          myself, understand myself, and be kinder to myself.' - Dr Zoë Williams
          'Zoë's techniques are easy and give great results. Her work has given
          me wonderful insight into how I can look after my mind and makes
          mental wellness feel accessible to everyone. I highly recommend Your
          Mental Health Workout(TM) to anyone who has the desire to improve
          their emotional health.' - Pixie Lott About the Author: Zoë is a
          London-based psychotherapist and mental health consultant. With over a
          decade of therapeutic experience from her personal life and
          professional endeavours, she now brings therapy out of the therapeutic
          space to a mass audience to make support available to all who want it.
          She runs a private psychotherapy practice and works as a mental health
          consultant for boutique brands in the fitness & wellness sector.
        </div>
      </div>
    </div>
  );
};

SelectedProduct.propTypes = {
  product: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addWishlist: PropTypes.func,
  wishlist: PropTypes.array,
  addWishlistMsg: PropTypes.string,
};

const mapStateToProps = (state) => ({
  product: state.product.selectedProduct,
  user: state.login.user,
  wishlist: state.login.wishlist,
  addWishlistMsg: state.login.addWishlistMsg,
});

export default connect(mapStateToProps, { addWishlist })(SelectedProduct);
