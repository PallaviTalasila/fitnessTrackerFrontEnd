import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "white",
    fontSize: "20px",
    marginTop: "0",
    padding: "8px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    fontWeight: "600",
    marginLeft: "10px",
  },
  linkColor: {
    color: "white",
    textDecoration: "none",
  },
}));

export default function Header({
  setUsername,
  setPassword,
  loggedIn,
  setLoggedIn,
}) {
  const history = useHistory();

  const classes = useStyles();
  const handleClick = (event) => {
    event.preventDefault();
    localStorage.removeItem(`Token`);
    localStorage.removeItem(`Username`);
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    history.push("/login");
  };

  return (
    <AppBar position="absolute">
      <Toolbar className={classes.root}>
        Fitness Tracker
        <Link className={classes.linkColor} to="/">
          <Button color="inherit">HOME</Button>
        </Link>
        <Link className={classes.linkColor} to="/profile">
          <Button color="inherit">ROUTINES</Button>
        </Link>
        {!loggedIn ? null : (
          <Link className={classes.linkColor} to="/profile">
            <Button color="inherit">MY ROUTINES</Button>
          </Link>
        )}
        <Link className={classes.linkColor} to="/posts">
          <Button color="inherit">ACTIVITIES</Button>
        </Link>
        {loggedIn ? null : (
          <Link className={classes.linkColor} to="/login">
            <Button color="inherit">LOGIN</Button>
          </Link>
        )}
        {!loggedIn ? null : (
          <Button color="inherit" onClick={handleClick}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
