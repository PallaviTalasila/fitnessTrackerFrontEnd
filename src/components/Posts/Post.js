import React from "react";

const Post = (props) => {
  const { post, onChange } = props;
  const { title, description, price, location, deliver } = post;
  const nothing = () => {};

  return (
    <div className="form-style-8">
      <h2>Post</h2>

      <form>
      <lable
            style={{ color: "#3f51b5", fontStyle: "bold", fontWeight: 500 }}
          >
            Title
        <input
          type="text"
          name="title"
          value={title}
          readOnly={!!title}
          onChange={title ? nothing : onChange}
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
          readOnly={!!description}
          onChange={description ? nothing : onChange}
        /></lable>
        <lable
            style={{ color: "#3f51b5", fontStyle: "bold", fontWeight: 500 }}
          >
           Price

        <input
          type="text"
          name="price"
          value={price}
          readOnly={!!price}
          onChange={price ? nothing : onChange}
        /></lable>
        <lable
            style={{ color: "#3f51b5", fontStyle: "bold", fontWeight: 500 }}
          >
            Location

        <input
          type="text"
          name="location"
          value={location}
          readOnly={!!location}
          onChange={location ? nothing : onChange}
        />
        </lable>
        <label>
          <input
            type="checkbox"
            name="deliver"
            checked={deliver}
            value={deliver ? true : false}
            disabled={!!deliver}
            onChange={deliver ? nothing : onChange}
          />
          <span style={{ color: "#3f51b5",paddingLeft: "10px", fontWeight: "500" }}>
            Willing to Deliver?
          </span>
        </label>
      </form>
    </div>
  );
};

export default Post;
