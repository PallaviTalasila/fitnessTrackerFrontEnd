import React from "react";
import swal from "sweetalert";
import { login } from "../api";
import { Link } from "react-router-dom";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  loggedIn,
  userToken,
  setUserToken,
  setLoggedIn,
  history,
}) => {
  const fetchApi = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      if (data.success === false) {
        swal(data.error.message);
        setUsername("");
        setPassword("");
      } else {
        const token = data.data.token;
        localStorage.setItem(`Token`, token);
        setUserToken(token);
        setLoggedIn(true);
        setUsername(username);
        localStorage.setItem(`Username`, username);
        swal(`You are logged in as ${username}`);
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
        <h2>Login to your account</h2>
        <form onSubmit={fetchApi}>
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
          <button type="submit">
            Submit
          </button>
        </form>
        <div style={{marginTop:'10px'}}>
        <label>Don't have an account? </label>
        <Link to="/register">Sign up Here</Link>
        </div>
      </div>
    );
  }
};

export default Login;
