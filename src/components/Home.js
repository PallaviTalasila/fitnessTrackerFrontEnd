import React from "react";
import background from "./fitness.jpg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
    paddingLeft: "100px",
    paddingRight: "100px",
  },
}));

const Home = ({ username, loggedIn }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.wrapper}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <h1>Welcome to Ftiness Tracker</h1>
        {loggedIn ? <h2>You are logged in as {username}</h2> : null}
      </div>
    </div>
  );
};

export default Home;
