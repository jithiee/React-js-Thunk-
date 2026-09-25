import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskLists: [],
  is_loading: false,
  error: "",
};

// ================= GET TASKS =================

export const getTasksFromServer = createAsyncThunk(
  "tasks/getTasksFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/tasks");

      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        return rejectWithValue("No tasks found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================= ADD TASK =================

export const addTaskToServer = createAsyncThunk(
  "tasks/addTaskToServer",
  async (newTask, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        return rejectWithValue("Failed to add task");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================= DELETE TASK =================

export const deleteTaskFromServer = createAsyncThunk(
  "tasks/deleteTaskFromServer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        return rejectWithValue("Failed to delete task");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================= UPDATE TASK =================

export const updateTaskToServer = createAsyncThunk(
  "tasks/updateTaskToServer",
  async (updatedTask, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/tasks/${updatedTask.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        return rejectWithValue("Failed to update task");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================= SLICE =================

const taskListSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= GET =================

      .addCase(getTasksFromServer.pending, (state) => {
        state.is_loading = true;
        state.error = "";
      })

      .addCase(getTasksFromServer.fulfilled, (state, action) => {
        state.is_loading = false;
        state.taskLists = action.payload;
      })

      .addCase(getTasksFromServer.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload;
        state.taskLists = [];
      })

      // ================= POST =================

      .addCase(addTaskToServer.pending, (state) => {
        state.is_loading = true;
        state.error = "";
      })

      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.is_loading = false;
        state.taskLists.push(action.payload);
      })

      .addCase(addTaskToServer.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload;
      })

      // ================= DELETE =================

      .addCase(deleteTaskFromServer.pending, (state) => {
        state.is_loading = true;
        state.error = "";
      })

      .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
        state.is_loading = false;

        state.taskLists = state.taskLists.filter(
          (item) => item.id !== action.payload
        );
      })

      .addCase(deleteTaskFromServer.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload;
      })

      // ================= UPDATE =================

      .addCase(updateTaskToServer.pending, (state) => {
        state.is_loading = true;
        state.error = "";
      })

      .addCase(updateTaskToServer.fulfilled, (state, action) => {
        state.is_loading = false;

        state.taskLists = state.taskLists.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })

      .addCase(updateTaskToServer.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload;
      });
  },
});

export default taskListSlice.reducer;