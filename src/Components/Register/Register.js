import { useState } from "react";
import PropTypes from "prop-types";
import { register } from "../../ActionCreators/loginActionData";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Register = ({ errorMessage, isLoading, isRegistered, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    password2: "",
  });

  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const navigate = useNavigate();

  const { name, email, contactNumber, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setPasswordMismatchError(
        "Passwords not matching.Please try again with valid password"
      );
    } else {
      setPasswordMismatchError("");
      register(formData, navigate);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="formContainer">
        {passwordMismatchError ? (
          <div id="error">{passwordMismatchError}</div>
        ) : errorMessage ? (
          <div id="error">{errorMessage}</div>
        ) : (
          <div id="noError"></div>
        )}
        <input
          type="text"
          placeholder="Name"
          value={name}
          name="name"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Contact number"
          value={contactNumber}
          name="contactNumber"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={password2}
          name="password2"
          onChange={handleChange}
          required
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isRegistered: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  errorMessage: state.login.errorMessage,
  isRegistered: state.login.isRegistered,
  isLoading: state.login.loading,
});

export default connect(mapStateToProps, { register })(Register);
