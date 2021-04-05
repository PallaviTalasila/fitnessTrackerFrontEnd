import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Header,
  Login,
  Register,
  Home,
  ViewRoutines,
  MyRoutines,
  ViewActivities,
} from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const loginKey = localStorage.getItem(`Token`);
  const userNameKey = localStorage.getItem(`Username`);
  const [username, setUsername] = useState(userNameKey ? userNameKey : "");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState(loginKey ? loginKey : false);
  const [loggedIn, setLoggedIn] = useState(loginKey ? true : false);

  return (
    <div className="app">
      <Router>
        <Header
          setUsername={setUsername}
          setPassword={setPassword}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                userToken={userToken}
                setUserToken={setUserToken}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            )}
          />
          <Route
            path="/register"
            render={(props) => (
              <Register
                {...props}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                userToken={userToken}
                setUserToken={setUserToken}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            )}
          />
          <Route
            path="/routines"
            render={(props) => (
              <ViewRoutines
                {...props}
                username={username}
                userToken={userToken}
                loggedIn={!loggedIn}
              />
            )}
          />
          <Route
            path="/myroutines"
            render={(props) => (
              <MyRoutines
                {...props}
                username={username}
                userToken={userToken}
                loggedIn={loggedIn}
              />
            )}
          />
          <Route
            path="/activities"
            render={(props) => (
              <ViewActivities
                {...props}
                username={username}
                userToken={userToken}
                loggedIn={loggedIn}
              />
            )}
          />

          <Route
            path="/"
            render={(props) => (
              <Home {...props} username={username} loggedIn={loggedIn} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
