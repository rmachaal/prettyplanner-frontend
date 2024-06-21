import axios from "axios";

export const getTodoLists = async () => {
  try {
    const response = await axios.get("https://prettyplanner-api.onrender.com/todolists");
    console.log("Fetched Todo Lists", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching to-do lists:", error);
    throw error;
  }
};

export const getTodoListById = async (id) => {
  try {
    const response = await axios.get(
      `https://prettyplanner-api.onrender.com/todolists/${id}`,
    );
    console.log("Fetched List Items", response.data);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching list:", error);
    throw error;
  }
};

export const createTodoList = async (title) => {
  try {
    const response = await axios.post(
      "https://prettyplanner-api.onrender.com/todolists",
      { title },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating todo list:", error);
    throw error; 
  }
};

// getTodoLists();
