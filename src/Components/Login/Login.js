import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearError, login } from "../../ActionCreators/loginActionData";
import Loading from "../../Utils/Loading";

import { useNavigate } from "react-router-dom";
const Login = ({ errorMessage, login, clearError }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;

  useEffect(() => {
    clearError();
  }, []);
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
    <div className="formContainer" id="loginId">
      <Loading />
      <form onSubmit={handleSubmit}>
        <div
          style={{
            position: "relative",
            top: "20px",
            fontSize: "xx-large",
            color: "#A5BECC",
            fontFamily: '"Noto Sans", sans-serif',
            textAlign: "center",
          }}
        >
          Login
        </div>
        {errorMessage ? (
          <div id="error">{errorMessage}</div>
        ) : (
          <div id="noError"></div>
        )}
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{ margin: "10px auto" }}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          placeholder="Password"
          style={{ margin: "10px auto" }}
        />
        <input type="submit" value="Login" />
        <p style={{ color: "#F2EBE9", textAlign: "center" }}>
          New to Where is my book ?{" "}
          <span
            style={{
              cursor: "pointer",
              color: "#A5BECC",
              fontFamily: '"Noto Sans", sans-serif',
            }}
            onClick={handleNavigateRegister}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.login.errorMessage,
});

export default connect(mapStateToProps, { login, clearError })(Login);
