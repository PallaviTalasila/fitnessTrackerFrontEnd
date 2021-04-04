import React, { useEffect } from "react";
import SimpleTabs from "../components/helpers/ProfileTab";

const Profile = ({
  message,
  setMessage,
  userToken,
  username,
  myMessages,
  setMyMessages,
  myPosts,
  setMyPosts,
}) => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2010-unf-rm-web-pt/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const data = await response.json();

        setMyMessages(data.data.messages);
        setMyPosts(data.data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [userToken]);

  return (
    <div>
      <SimpleTabs
        myMessages={myMessages}
        username={username}
        message={message}
        setMessage={setMessage}
        userToken={userToken}
      />
    </div>
  );
};

export default Profile;
