import React from "react";
import swal from "sweetalert";
import { fetchMessage } from "../../api";

const Message = ({ message, setMessage, userToken, loggedIn, postId }) => {
  const sendMessage = async (event) => {
    event.preventDefault();

    try {
      const data = await fetchMessage(postId, userToken, message);
      if(data.success === true) {
        setMessage("");
      swal("Your message was sent successfully");
      } else {
        swal("Message failed to send");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-style-8">
      <h2>Send Message</h2>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type Your Message Here"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Message;
