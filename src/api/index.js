const BASE_URL = "https://fitnesstrac-kr.herokuapp.com";

/******************************USERS************************************/

export async function register(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchme(token) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchPublicRoutines(username) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${username}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllRoutines(username, token) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${username}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
/******************************ACTIVITIES************************************/

export async function fetchAllActivities() {
  try {
    const response = await fetch(`${BASE_URL}/api/activities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function addNewActivitiy(name, description, token) {
  try {
    const response = await fetch(`${BASE_URL}/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateActivitiy(token,name, description, id) {
  try {
    const response = await fetch(`${BASE_URL}/api/activities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchPublicRoutinesForActivity(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/activities/${id}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

/******************************ROUTINES************************************/

export async function fetchAllPublicRoutines() {
  try {
    const response = await fetch(`${BASE_URL}/api/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function addNewRoutine(token, name, goal, isPublic) {
  try {
    const response = await fetch(`${BASE_URL}/api/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateRoutine(id, name, goal, isPublic) {
  try {
    const response = await fetch(`${BASE_URL}/api/routines/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: true,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteRoutine(id, token) {
  try {
    const response = await fetch(`${BASE_URL}/api/routines/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function addActivityToRoutine(
  routineId,
  activityId,
  count,
  duration
) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count,
          duration: duration,
        }),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
/******************************ROUTINE ACTIVITIES************************************/

export async function updateRoutineActivity(id,count,duration) {
  try {
    const response = await fetch(`${BASE_URL}/api/routine_activities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        count: count,
        duration: duration,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}


export async function deleteRoutineActivity(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/routine_activities/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

/*********************************************************************************** */


export async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/api/2010-unf-rm-web-pt/posts`);
    const results = await response.json();
    return results.data;
  } catch (error) {
    throw error;
  }
}

export async function addPost(token, formData) {
  try {
    const response = await fetch(`${BASE_URL}/api/2010-unf-rm-web-pt/posts`, {
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
