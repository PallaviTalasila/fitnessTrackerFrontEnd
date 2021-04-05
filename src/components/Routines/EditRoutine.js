import React, { useState } from "react";
import {
  updateRoutine,
  deleteRoutine,
  fetchAllPublicRoutines,
} from "../../api";
import EditActivities from "./EditActivities";
import swal from "sweetalert";

const EditRoutine = (props) => {
  const {
    routineId,
    routine,
    routines,
    setRoutines,
    loggedIn,
    userToken,
  } = props;
  const [goal, setGoal] = useState(routine.goal);
  const [name, setName] = useState(routine.name);

  async function handleSave(e) {
    e.preventDefault();

    try {
      const data = await updateRoutine(routineId, name, goal);
      if (data.error) swal(data.message);
      else swal("Sucessfully Edited Routine");
      //fetch new Routines from the api
      try {
        Promise.all([fetchAllPublicRoutines()]).then(([data]) => {
          setRoutines(data);
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      swal("Failed to Edit Routine");
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const data = await deleteRoutine(routineId, userToken);
      if (data.error) swal(data.message);
      else swal("Routine successfully Deleted");
      //fetch new Routines from the api
      try {
        Promise.all([fetchAllPublicRoutines()]).then(([data]) => {
          setRoutines(data);
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      swal("Failed to Delete Routine");
    }
  }
  return (
    loggedIn && (
      <div className="form-style-8">
        <h2>Edit Routine</h2>
        <form>
          <div style={{ color: "#3f51b5", fontStyle: "bold", fontWeight: 800 }}>
            Routine:
          </div>
          <br />

          <lable
            style={{ color: "#3f51b5", fontStyle: "bold", fontWeight: 500 }}
          >
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </lable>
          <lable
            style={{ color: "#3f51b5", fontStyle: "bold", fontWeight: 500 }}
          >
            Goal
            <input
              type="text"
              name="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </lable>

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleSave}>Save</button>
            <span style={{ marginLeft: "5px" }}>
              <button onClick={handleDelete}>Delete</button>
            </span>
          </div>
          <br />
          <br />
          <div style={{ color: "#3f51b5", fontStyle: "bold", fontWeight: 800 }}>
            Activities:
          </div>
          <br />
          <EditActivities
            routineId={routine.id}
            routine={routine}
            routines={routines}
            setRoutines={setRoutines}
          />
        </form>
      </div>
    )
  );
};

export default EditRoutine;
