import axios from "axios";

export const getTodoLists = async () => {
  try {
    const response = await axios.get(
      "https://prettyplanner-api.onrender.com/todolists",
    );
    console.log("Fetched Todo Lists", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching to-do lists:", error);
    throw error;
  }
};

export const getTodoListById = async (id: number) => {
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

export const createTodoList = async (title: string) => {
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

export const deleteTodoList = async (id: number) => {
  console.log(`Deleting todo list with id ${id}...`);
  try {
    await axios.delete(
      `https://prettyplanner-api.onrender.com/todolists/${id}`,
    );
    console.log(`Todo list with id ${id} has been deleted successfully.`);
  } catch (error) {
    console.error("Error creating todo list:", error);
    throw error;
  }
};

export const addItemToList = async (id: number, item: object) => {
  try {
    const response = await axios.post(
      `https://prettyplanner-api.onrender.com/todolists/${id}/items`,
      item ,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating todo list:", error);
    throw error;
  }
};

export const deleteToDoListItem = async (selectedListId: number, id: number) => {
  try {
    await axios.delete(
      `https://prettyplanner-api.onrender.com/todolists/${selectedListId}/items/${id}`,
    );
    console.log(`Item with id ${id} has been deleted successfully.`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}