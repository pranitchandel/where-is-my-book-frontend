import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated }) => {
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Component />;
  }
  return navigate("/login");
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
});

export default connect(mapStateToProps, {})(PrivateRoute);
