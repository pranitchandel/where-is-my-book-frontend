import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { clearError, register } from "../../ActionCreators/loginActionData";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../Utils/Loading";

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

  useEffect(() => {
    clearError();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNavigateRegister = () => {
    navigate("/login");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setPasswordMismatchError("Passwords not matching");
    } else {
      setPasswordMismatchError("");
      register(formData, navigate);
    }
  };
  return (
    <div className="formContainer" id="registerId">
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
          Register
        </div>
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
          style={{ margin: "10px auto" }}
        />

        <input
          type="text"
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleChange}
          required
          style={{ margin: "10px auto" }}
        />

        <input
          type="text"
          placeholder="Contact number"
          value={contactNumber}
          name="contactNumber"
          onChange={handleChange}
          style={{ margin: "10px auto" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
          style={{ margin: "10px auto" }}
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={password2}
          name="password2"
          onChange={handleChange}
          required
          style={{ margin: "10px auto" }}
        />
        <input type="submit" value="Register" />
        <p style={{ color: "#F2EBE9", textAlign: "center" }}>
          Already registered ?{" "}
          <span
            style={{
              cursor: "pointer",
              color: "#A5BECC",
              fontFamily: '"Noto Sans", sans-serif',
            }}
            onClick={handleNavigateRegister}
          >
            login here
          </span>
        </p>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isRegistered: PropTypes.bool,
  clearError: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  errorMessage: state.login.errorMessage,
  isRegistered: state.login.isRegistered,
  isLoading: state.login.loading,
});

export default connect(mapStateToProps, { register, clearError })(Register);
