import React, { useState, useEffect } from "react";
import { fetchAllActivities } from "../../api";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AppBar from "../helpers/AppBarGeneric";

const useStyles = makeStyles((theme) => ({
  postsWrapper: {
    display: "flex",
    flexDirection: "column !important",
  },

  root: {
    maxWidth: "75%",
    margin: "auto",
    paddingTop: "50px",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
    paddingLeft: "10px",
  },

  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  items: {
    borderRadius: "10px",
    marginBottom: "10px",
    backgroundColor: "#e6ebff",
  },

  expandedPanel: {
    backgroundColor: theme.palette.primary.main,
    color: "white !important",
  },
  title: {
    flex: "1 1 1005",
    fontSize: theme.typography.pxToRem(15),
  },
}));

const ViewActivities = (props) => {
  const [activities, setActivities] = useState([]);
  const classes = useStyles();

  const [state, setState] = useState({
    top: false,
  });

  const { userToken, loggedIn, username } = props;

  useEffect(() => {
    try {
      Promise.all([fetchAllActivities()]).then(([data]) => {
        setActivities(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggleViewDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  return (
    <div>
      <AppBar
        activities={activities}
        setActivities={setActivities}
        loggedIn={loggedIn}
        userToken={userToken}
      />
      <div className={classes.root}>
        {activities.map((activity, index) => {
          return (
            <Accordion key={index} className={classes.items}>
              <AccordionSummary
                aria-controls="panel1c-content"
                id="panel1c-header"
                classes={{ expanded: classes.expandedPanel }}
              >
                <div>
                  <Typography className={classes.details}>
                    <div>
                      <b>Id:</b> {activity.id}{" "}
                    </div>
                    <div>
                      {" "}
                      <b>Name:</b> {activity.name}{" "}
                    </div>
                    <div>
                      <b>Description:</b> {activity.description}
                    </div>
                  </Typography>
                </div>
              </AccordionSummary>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default ViewActivities;
