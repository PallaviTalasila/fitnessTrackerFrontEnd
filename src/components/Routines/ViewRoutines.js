import React, { useState, useEffect } from "react";
import { fetchAllPublicRoutines } from "../../api";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import EditRoutine from "./EditRoutine";
import Table from "../helpers/Table";
import AppBarWithSearch from "../helpers/AppBarWithSearch";

const useStyles = makeStyles((theme) => ({
  postsWrapper: {
    display: "flex",
    flexDirection: "column !important",
  },

  root: {
    maxWidth: "75%",
    margin: "auto",
    paddingTop: "20px",
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

const ViewRoutines = (props) => {
  const [routines, setRoutines] = useState([]);
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState({
    top: false,
  });

  const { userToken, loggedIn, username } = props;

  useEffect(() => {
    try {
      Promise.all([fetchAllPublicRoutines()]).then(([data]) => {
        console.log(data);
        setRoutines(data);
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

  const routineMatches = (routine, text) => {
    const lowerCaseText = text.toLowerCase();
    const goal = routine.goal.toLowerCase();
    const name = routine.name.toLowerCase();
    const creatorName = routine.creatorName.toLowerCase();

    if (
      goal.includes(lowerCaseText) ||
      name.includes(lowerCaseText) ||
      creatorName.includes(lowerCaseText)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const filteredRoutines = routines.filter((routine) =>
    routineMatches(routine, searchTerm)
  );
  const routinesToDisplay = searchTerm.length ? filteredRoutines : routines;

  return (
    <div>
      <AppBarWithSearch
        routines={routines}
        setRoutines={setRoutines}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loggedIn={loggedIn}
        userToken={userToken}
      />
      <div className={classes.root}>
        {routinesToDisplay.map((routine, index) => {
          return (
            <Accordion key={index} className={classes.items}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
                classes={{ expanded: classes.expandedPanel }}
              >
                <div>
                  <Typography className={classes.heading}>
                    {routine.name}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <div className={clsx(classes.column, classes.helper)}>
                  <Typography variant="caption">
                    Goal: {routine.goal}
                    <br />
                    CreatorName: {routine.creatorName}
                    <br />
                    <br />
                    {routine.activities.length > 0 ? (
                      <div>
                        <div className={classes.title}>Activities</div>
                        <Table
                          data={routine.activities}
                          header={[
                            {
                              name: "Name",
                              prop: "name",
                            },
                            {
                              name: "Description",
                              prop: "description",
                            },
                            {
                              name: "Duration",
                              prop: "duration",
                            },
                            {
                              name: "Count",
                              prop: "count",
                            },
                          ]}
                        />
                      </div>
                    ) : null}
                  </Typography>
                </div>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                {loggedIn && username === routine.creatorName? (
                  <>
                    <Button
                      size="small"
                      color="primary"
                      onClick={toggleViewDrawer(routine.id, true)}
                    >
                      <span style={{ color: "white" }}>Edit Routine</span>
                    </Button>
                    <Drawer
                      anchor={"top"}
                      open={state[routine.id]}
                      onClose={toggleViewDrawer(routine.id, false)}
                    >
                      <div>
                        <EditRoutine
                          routineId={routine.id}
                          routine={routine}
                          routines={routines}
                          setRoutines={setRoutines}
                          loggedIn={loggedIn}
                          userToken={userToken}
                        />
                        )
                      </div>
                    </Drawer>
                  </>
                ) : null}
              </AccordionActions>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default ViewRoutines;
