import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Header,
  Login,
  Register,
  Home,
  ViewPosts,
  Profile,
} from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const loginKey = localStorage.getItem(`Token`);
  const userNameKey = localStorage.getItem(`Username`);
  const [username, setUsername] = useState(userNameKey ? userNameKey : "");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState(loginKey ? loginKey : false);
  const [loggedIn, setLoggedIn] = useState(loginKey ? true : false);
  const [message, setMessage] = useState("");
  const [myMessages, setMyMessages] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

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
            path="/profile"
            render={(props) => (
              <Profile
                {...props}
                username={username}
                userToken={userToken}
                message={message}
                setMessage={setMessage}
                myMessages={myMessages}
                setMyMessages={setMyMessages}
                myPosts={myPosts}
                setMyPosts={setMyPosts}
              />
            )}
          />
          <Route
            path="/posts"
            render={(props) => (
              <ViewPosts
                {...props}
                loggedIn={loggedIn}
                userToken={userToken}
                username={username}
                message={message}
                setMessage={setMessage}
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
