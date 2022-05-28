import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../ActionCreators/loginActionData";
import { useNavigate } from "react-router-dom";
const Login = ({ currentUser, isAuthenticated, errorMessage, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNavigateRegister = () => {
    navigate("/register");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, navigate);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="loginForm">
        {errorMessage ? (
          <div id="error">{errorMessage}</div>
        ) : (
          <div id="noError"></div>
        )}
        <div className="loginSection">
          <div className="loginInput">
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="loginSection">
          <div className="loginInput">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
          </div>
        </div>
        <input type="submit" value="Login" />
        <input
          type="button"
          value="Register"
          onClick={handleNavigateRegister}
        />
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  currentUser: state.login.user,
  isAuthenticated: state.login.isAuthenticated,
  errorMessage: state.login.errorMessage,
});

export default connect(mapStateToProps, { login })(Login);
