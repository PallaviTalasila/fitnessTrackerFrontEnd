import React, { useState } from "react";
import { fetchEditPost, fetchDelete, fetchPosts } from "../../api";
import swal from "sweetalert";

const EditPost = (props) => {
  const { postId, post, setPosts, loggedIn, userToken } = props;
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [price, setPrice] = useState(post.price);
  const [location, setLocation] = useState(post.location);
  const [deliver, setDeliver] = useState(post.willDeliver);

  async function handleSave(e) {
    e.preventDefault();

    try {
      await fetchEditPost(
        postId,
        userToken,
        title,
        description,
        price,
        location,
        deliver
      );
      swal("Sucessfully Edited Post");
      //fetch new posts from the api
      try {
        Promise.all([fetchPosts()]).then(([data]) => {
          setPosts(data.posts);
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      swal("Failed to Edit Post");
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await fetchDelete(postId, userToken);
      swal("Post successfully Deleted");
      //fetch new posts from the api
      try {
        Promise.all([fetchPosts()]).then(([data]) => {
          setPosts(data.posts);
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      swal("Failed to Delete Post");
    }
  }
  return (
    loggedIn && (
      <div className="form-style-8">
        <h2>Edit Post</h2>
        <form>
          <lable style={{ color: "#3f51b5", fontStyle: "bold" ,fontWeight: 500 }}>
            Title
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </lable>
          <lable
            style={{ color: "#3f51b5", fontStyle: "bold", fontWeight: 500 }}
          >
            Description
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </lable>
          <lable
            style={{ color: "#3f51b5", fontStyle: "bold", fontWeight: 500 }}
          >
            Price
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </lable>
          <lable
            style={{ color: "#3f51b5", fontStyle: "bold", fontWeight: 500 }}
          >
            Location
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </lable>
          <label>
            <input
              type="checkbox"
              name="deliver"
              value={deliver}
              onChange={(e) => setDeliver(e.target.value.trim())}
            />
            <span style={{color: "#3f51b5", paddingLeft: "10px", fontWeight: "500" }}>
              Willing to Deliver?
            </span>
          </label>
          <div style={{ marginTop: "10px" }}>
            <button onClick={handleSave}>Save</button>
            <span style={{ marginLeft: "5px" }}>
              <button onClick={handleDelete}>Delete</button>
            </span>
          </div>
        </form>
      </div>
    )
  );
};

export default EditPost;
