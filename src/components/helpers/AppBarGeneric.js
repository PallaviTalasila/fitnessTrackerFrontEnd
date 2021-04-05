import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddActivity from "../Activities/AddActivity";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    maxWidth: "75%",
    margin: "auto",
    display: "flex",
    paddingTop: "100px",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "inherit",
  },
}));

export default function AppBarGeneric({
  activities,
  setActivities,
  loggedIn,
  userToken,
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
  });
  //const { loggedIn, userToken, setPosts, posts } = props;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.appBar}>
      <AppBar position="relative">
        <Typography className={classes.title} variant="h6" noWrap>
          <span style={{ display: "inline" }}>Activities</span>
          <span style={{ display: "inline" }}>
            {loggedIn && (
              <Button
                onClick={toggleDrawer("top", true)}
                style={{ color: "black",backgroundColor: "#e6ebff" }}
              >
                Add Activity
              </Button>
            )}

            <Drawer
              anchor={"top"}
              open={state["top"]}
              onClose={toggleDrawer("top", false)}
            >
              <AddActivity
                loggedIn={loggedIn}
                userToken={userToken}
                setActivities={setActivities}
                activities={activities}
              />
            </Drawer>
          </span>
        </Typography>
      </AppBar>
    </div>
  );
}
