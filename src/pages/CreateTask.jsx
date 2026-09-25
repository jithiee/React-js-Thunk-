import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskToServer } from "../slice/taskListSlice";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTaskToServer(formData));

    // Clear form after submitting
    setFormData({
      title: "",
      description: "",
    });
  };

  return (
    <div>
      <h1>Create Task</h1>

      <hr />

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <label htmlFor="title">Title:</label>

        <input
          id="title"
          type="text"
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />
        <br />

        {/* Description */}
        <label htmlFor="description">Description:</label>

        <input
          id="description"
          type="text"
          name="description"
          placeholder="Enter task description"
          value={formData.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTask;