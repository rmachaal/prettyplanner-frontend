import axios from "axios";

export const getTodoLists = async () => {
  try {
    const response = await axios.get("https://prettyplanner.onrender.com/todolists");
    console.log("Fetched Todo Lists", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching to-do lists:", error);
    throw error;
  }
};

// getTodoLists();
