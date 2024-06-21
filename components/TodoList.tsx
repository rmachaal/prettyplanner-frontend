import React, { useEffect, useState } from "react";
import { getTodoLists, getTodoListById } from "../app/api/plannerApi";

const TodoList = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedListItems, setSelectedListItems] = useState<any[]>([]); // Adjust type as per your API response
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleListClick = async (id: any) => {
    try {
      const listItems = await getTodoListById(id);
      setSelectedListItems(listItems);
      setModalOpen(true);
    } catch (err: any) {
      console.error("Error fetching list items:", err);
      setError(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading todo lists: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {todoLists.map((list: any) => (
        <div
          key={list.id}
          className="cursor-pointer rounded-md bg-white p-4 shadow-md"
          onClick={() => handleListClick(list.id)}
        >
          <h2 className="mb-2 font-sans text-xs font-bold">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {list.title}
            </span>
          </h2>
          {/* Add buttons or links for viewing/editing/deleting each list */}
        </div>
      ))}
      {modalOpen && selectedListItems && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">List Items</h2>
            <ul>
              {selectedListItems.map((item: any) => (
                <li key={item.id}>{item.content}</li>
              ))}
            </ul>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
