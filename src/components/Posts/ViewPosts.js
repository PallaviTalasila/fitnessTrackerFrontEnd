import React, { useState, useEffect } from "react";
import { fetchPosts } from "../../api";
import AppBarWithSearch from "../helpers/AppBarWithSearch";
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
import Post from "./Post";
import Message from "./Message";
import Drawer from "@material-ui/core/Drawer";
import EditPost from "./EditPost";

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
    color: theme.palette.text.secondary
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
  items:{borderRadius:"10px",marginBottom:'10px',backgroundColor:	"#e6ebff"},
 
  expandedPanel: {
    backgroundColor: theme.palette.primary.main,
    color: "white !important",
  },
}));

const ViewPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
  });
  const [messageState, setMessageState] = useState({
    top: false,
  });

  const { userToken, loggedIn, message, setMessage, username } = props;

  useEffect(() => {
    try {
      Promise.all([fetchPosts()]).then(([data]) => {
        setPosts(data.posts);
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

  const toggleMessageDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMessageState({ ...messageState, [anchor]: open });
  };

  const postMatches = (post, text) => {
    const lowerCaseText = text.toLowerCase();
    const author = post.author.username.toLowerCase();
    const description = post.description.toLowerCase();
    const location = post.location.toLowerCase();
    const title = post.title.toLowerCase();
    if (
      author.includes(lowerCaseText) ||
      description.includes(lowerCaseText) ||
      location.includes(lowerCaseText) ||
      title.includes(lowerCaseText)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <div>
      <AppBarWithSearch
        posts={posts}
        setPosts={setPosts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loggedIn={loggedIn}
        userToken={userToken}
      />
      <div className={classes.root}>
        {postsToDisplay.map((post, index) => {
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
                    {post.title}
                  </Typography>
                </div>
                <div className={classes.details}>
                  <Typography className={classes.secondaryHeading}>
                    {post.description}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <div className={classes.column} />
                <div className={classes.column}></div>
                <div className={clsx(classes.column, classes.helper)}>
                  <Typography variant="caption">
                    Price: {post.price}
                    <br />
                    Delivery: {post.willDeliver ? "Available" : "Not Available"}
                    <br />
                    Location: {post.location}
                  </Typography>
                </div>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                {loggedIn && username !== post.author.username ? (
                  <>
                    <Button
                      size="small"
                      color="primary"
                      onClick={toggleMessageDrawer(post._id, true)}
                    >
                      <span style={{color:"white"}}>Send Message</span>
                    </Button>
                    <Drawer
                      anchor={"top"}
                      open={messageState[post._id]}
                      onClose={toggleMessageDrawer(post._id, false)}
                    >
                      <Message
                        key={post._id}
                        userToken={userToken}
                        loggedIn={loggedIn}
                        message={message}
                        setMessage={setMessage}
                        postId={post._id}
                      />
                    </Drawer>
                  </>
                ) : null}
                <Button
                  size="small"
                  color="primary"
                  onClick={toggleViewDrawer(post._id, true)}
                >
                    <span style={{color:"white"}}>View Post</span>
                </Button>
                <Drawer
                  anchor={"top"}
                  open={state[post._id]}
                  onClose={toggleViewDrawer(post._id, false)}
                >
                  <div>
                    {username === post.author.username ? (
                      <EditPost
                        postId={post._id}
                        post={post}
                        posts={posts}
                        setPosts={setPosts}
                        loggedIn={loggedIn}
                        userToken={userToken}
                      />
                    ) : (
                      <Post
                        postId={post._id}
                        post={post}
                        setPosts={setPosts}
                        posts={posts}
                      />
                    )}
                  </div>
                </Drawer>
              </AccordionActions>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default ViewPosts;
