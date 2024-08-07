import React, { useEffect, useState } from "react";
import {
  getTodoLists,
  getTodoListById,
  deleteTodoList,
  addItemToList,
  deleteToDoListItem,
  markItemAsCompleted,
} from "../app/api/plannerApi";
import { LoadingCircle } from "./icons";
import { log } from "console";

interface ITodoList {
  id: number;
  title: string;
}

const TodoList = () => {
  const [todoLists, setTodoLists] = useState<ITodoList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedListItems, setSelectedListItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newItemContent, setNewItemContent] = useState("");
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const fetchTodoLists = async () => {
    try {
      const lists = await getTodoLists();
      setTodoLists(lists);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  const handleListClick = async (id: number) => {
    setSelectedListId(id);
    try {
      const listItems = await getTodoListById(id);
      setSelectedListItems(listItems);
      setModalOpen(true);
    } catch (err: any) {
      console.error("Error fetching list items:", err);
      setError(err);
    }
  };

  const handleDeleteList = async (id: number) => {
    const originalLists = [...todoLists];

    const updatedLists = originalLists.filter((list) => list.id !== id);
    setTodoLists(updatedLists);

    try {
      await deleteTodoList(id);
      console.log(`Deleted item with id: ${id}`);
    } catch (error) {
      console.error("Error deleting item:", error);
      setTodoLists(originalLists);
      alert("Failed to delete the item. Please try again.");
    }
  };

  const handleAddItem = async () => {
    const originalItems = [...selectedListItems];

    const newItem = {
      content: newItemContent,
    };
    setSelectedListItems([...selectedListItems, newItem]);

    setNewItemContent("");

    try {
      if (selectedListId !== null) {
        await addItemToList(selectedListId, newItem);
        console.log(`Added item with content: ${newItem.content}`);
      } else {
        console.error("Error: selectedListId is null");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setSelectedListItems(originalItems);
      alert("Failed to add the item. Please try again.");
    }
  };

  const handleMarkCompleted = async (id: number) => {
    setCompleted(true);

    if (selectedListId !== null) {
      try {
        await markItemAsCompleted(selectedListId, id);
        console.log(`Marked item with id ${id} as completed.`);
      } catch (error) {
        console.error("Error marking item as completed:", error);
      } finally {
        setCompleted(false);
      }
    } else {
      console.error("Error: selectedListId is null");
      setCompleted(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    const originalItems = [...selectedListItems];

    const updatedItems = originalItems.filter((item) => item.id !== id);
    setSelectedListItems(updatedItems);

    try {
      if (selectedListId !== null) {
        await deleteToDoListItem(selectedListId, id);
        console.log(`Deleted item with id: ${id}`);
      } else {
        console.error("Error: selectedListId is null");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setSelectedListItems(originalItems);
      alert("Failed to delete the item. Please try again.");
    }
  };

  if (loading) {
    return (
      <div>
        <LoadingCircle />
      </div>
    );
  }

  if (error) {
    return <div>Error loading todo lists: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {todoLists.map((list: any) => (
        <div
          key={list.id}
          className="relative rounded-md bg-white p-4 shadow-md"
        >
          <h2
            className="mb-2 cursor-pointer text-xs font-bold"
            onClick={() => handleListClick(list.id)}
          >
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {list.title}
            </span>
          </h2>
          <button
            onClick={() => handleDeleteList(list.id)}
            className="absolute right-2 top-2 rounded-md bg-clip-text px-2 py-1 font-semibold text-transparent hover:bg-red-600"
          >
            x
          </button>
        </div>
      ))}
      {modalOpen && selectedListItems && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">List Items</h2>
            <ul className="list-disc">
              {selectedListItems.map((item: any) => (
                <li
                  key={item.id}
                  className="mb-2 flex items-center text-gray-700"
                >
                  <button
                    onClick={() => handleMarkCompleted(item.id)}
                    disabled={item.completed}
                    className={`${item.completed ? "text-gray-800" : "text-transparent"} bg-clip-text px-2 font-semibold hover:bg-green-600`}
                  >
                    ✔️
                  </button>
                  <p>{item.content}</p>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="ml-auto rounded-md bg-clip-text px-2 py-1 font-semibold text-transparent hover:bg-red-600"
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="Enter new item"
                value={newItemContent}
                onChange={(e) => setNewItemContent(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleAddItem}
                className="mr-2 w-1/2 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-2 text-white transition-all duration-300 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
              >
                Add Item
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="ml-2 w-1/2 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-2 text-white transition-all duration-300 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
