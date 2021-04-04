import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Message from "../Posts/Message";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
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
}));

export default function SimpleTabs({
  message,
  myMessages,
  setMessage,
  username,
  userToken,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className={classes.root}
      style={{
        paddingTop: "100px",
        width: "75%",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppBar position="relative">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
        >
          <Tab label="Messages from me" {...a11yProps(0)} />
          <Tab label="Messages to me" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {myMessages.map((messages) => {
          if (messages.fromUser.username === username) {
            return (
              <Accordion key={messages._id} className={classes.items}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                  classes={{ expanded: classes.expandedPanel }}
                >
                  <div>
                    <Typography className={classes.heading}  >
                      <strong>Sent by me:</strong> {messages.fromUser.username}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <div className={classes.content}>
                    <div>
                      <Typography variant="content">
                        <strong>Message:</strong> {messages.content}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption">
                        <strong>Post:</strong>
                        {messages.post.title}
                      </Typography>
                    </div>
                  </div>
                </AccordionDetails>
                <Divider />
              </Accordion>
            );
          } else {
            return null;
          }
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {myMessages.map((messages) => {
          if (messages.fromUser.username !== username) {
            return (
              <Accordion key={messages._id} className={classes.items}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                >
                  <div>
                    <Typography className={classes.heading}>
                      <strong>From:</strong> {messages.fromUser.username}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <div className={classes.content}>
                    <div>
                      <Typography variant="content">
                        <strong>Message:</strong> {messages.content}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption">
                        <strong>Post:</strong>
                        {messages.post.title}
                      </Typography>
                    </div>
                  </div>
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    size="small"
                    style={{color:"white"}}
                    onClick={toggleDrawer(messages.post._id, true)}
                  >
                    Send Message
                  </Button>
                  <Drawer
                    anchor={"top"}
                    open={state[messages.post._id]}
                    onClose={toggleDrawer(messages.post._id, false)}
                  >
                    <Message
                      key={messages.post._id}
                      userToken={userToken}
                      message={message}
                      setMessage={setMessage}
                      postId={messages.post._id}
                    />
                  </Drawer>
                </AccordionActions>
                <Divider />
              </Accordion>
            );
          } else {
            return null;
          }
        })}
      </TabPanel>
    </div>
  );
}
