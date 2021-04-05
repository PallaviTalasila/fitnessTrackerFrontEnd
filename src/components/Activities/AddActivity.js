import React, { useState } from "react";
import { fetchAllActivities, addNewActivitiy} from "../../api";
import swal from "sweetalert";

const initialFormData = Object.freeze({
  description: "",
  name: ""
});

const AddActivity = (props) => {
  const [formData, updateFormData] = useState(initialFormData);
  const { loggedIn, userToken, setActivities } = props;

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
      const data = await addNewActivitiy(formData.name,formData.description,userToken);
      if(data.error)  swal(data.error);
      else
      swal("Activity successfully Added");

      //fetch new Routines from the api
      try {
        Promise.all([fetchAllActivities()]).then(([data]) => {
          setActivities(data);
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      swal("Failed to Add Activity");
    }
  }
  return (
    loggedIn && (
      <div className="form-style-8">
        <h2>Add New Activity</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
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

export default AddActivity;
