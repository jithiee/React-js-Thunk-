import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTaskToServer } from "../slice/taskListSlice";

const EditTask = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get tasks from Redux
  const { taskLists } = useSelector((state) => state.tasks);

  // Find the task
  const task = taskLists.find((item) => item.id === Number(id));

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      id: Number(id),
      title: formData.title,
      description: formData.description,
    };

    try {
      await dispatch(updateTaskToServer(updatedTask)).unwrap();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>

      <hr />

      {task ? (
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <label htmlFor="title">Title:</label>

          <input
            id="title"
            type="text"
            name="title"
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
            value={formData.description}
            onChange={handleChange}
          />

          <br />
          <br />

          <button type="submit">
            Update Task
          </button>
        </form>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  );
};

export default EditTask;