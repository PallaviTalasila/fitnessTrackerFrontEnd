import React, { useState } from "react";
import { fetchAllPublicRoutines, addNewRoutine } from "../../api";
import swal from "sweetalert";

const initialFormData = Object.freeze({
  goal: "",
  name: "",
  isPublic:true
});

const AddRoutine = (props) => {
  const [formData, updateFormData] = useState(initialFormData);
  const { loggedIn, userToken, setRoutines } = props;

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value.trim();
    updateFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await addNewRoutine(userToken, formData.name, formData.goal,formData.isPublic);
      if(data.error)  swal(data.error);
      else
      swal("Routine successfully Added");

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
      swal("Failed to Add Routine");
    }
  }
  return (
    loggedIn && (
      <div className="form-style-8">
        <h2>Add New Routine</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="goal"
            placeholder="Goal"
            onChange={handleChange}
          />

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    )
  );
};

export default AddRoutine;
