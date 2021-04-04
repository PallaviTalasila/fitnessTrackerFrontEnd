const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT_NAME = "2010-unf-rm-web-pt";

export async function register(username, password) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/${COHORT_NAME}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/${COHORT_NAME}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/api/${COHORT_NAME}/posts`);
    const results = await response.json();
    return results.data;
  } catch (error) {
    throw error;
  }
}

export async function addPost(token, formData) {
  try {
    const response = await fetch(`${BASE_URL}/api/${COHORT_NAME}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: formData }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchMessage(postId, userToken, message) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2010-unf-rm-web-pt/posts/${postId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          message: {
            content: `${message}`,
          },
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchEditPost(
  postId,
  userToken,
  editTitle,
  editDescription,
  editPrice,
  editLocation,
  editWillDeliver
) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2010-unf-rm-web-pt/posts/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          post: {
            title: `${editTitle}`,
            description: `${editDescription}`,
            price: `${editPrice}`,
            location: `${editLocation}`,
            willDeliver: `${editWillDeliver}`,
          },
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDelete(postId, userToken) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2010-unf-rm-web-pt/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchProfile(userToken) {
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
    return data;
  } catch (error) {
    throw error;
  }
}
