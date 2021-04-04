import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import { register } from "../api";

const Register = ({
  username,
  setUsername,
  password,
  setPassword,
  userToken,
  setUserToken,
  setLoggedIn,
  loggedIn,
  history
}) => {
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const confirmPasswords = (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      swal("Passwords do not match");
    } else {
      fetchApi(event);
    }
  };

  const fetchApi = async (event) => {
    event.preventDefault();
    try {
      const data = await register(username, password);
      if (data.success === false) {
        swal(data.error.message);
        setUsername("");
        setPassword("");
        setPasswordConfirmation("");
      } else {
        const token = data.data.token;
        localStorage.setItem(`Token`, token);
        setUserToken(token);
        setLoggedIn(true);
        setUsername(username);
        localStorage.setItem(`Username`, username);
        swal(`You are logged in as ${username}`);
        setPasswordConfirmation("");
        history.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loggedIn) {
    return <div>You are already logged in</div>;
  } else {
    return (
      <div className="form-style-8">
        <h2>Register your account</h2>
        <form onSubmit={confirmPasswords}>
          <input
            type="text"
            minLength="6"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <input
            type="password"
            minLength="6"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
        <div style={{marginTop:'10px'}}>
        <label>Already have an account? </label>
        <Link to="/login">Sign in here.</Link>
        </div>
      </div>
    );
  }
};

export default Register;
