"use client"; // Add this at the top

import React, { useEffect, useState } from "react";
import { getTodoLists } from "../app/api/plannerApi"; // Ensure the path is correct

const TodoList = () => {
  console.log("TodoList component rendering...");

  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered - Fetching todo lists...");

    const fetchTodoLists = async () => {
      try {
        console.log("Calling getTodoLists function...");
        const lists = await getTodoLists();
        console.log("Received todo lists:", lists);
        setTodoLists(lists);
      } catch (err) {
        console.error("Error fetching to-do lists:", err);
        setError(err);
      } finally {
        console.log("Finished fetching todo lists.");
        setLoading(false);
      }
    };

    fetchTodoLists();
  }, []);

  if (loading) {
    console.log("Loading state: Showing loading message...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error state: Showing error message...");
    return <div>Error loading todo lists: {error.message}</div>;
  }

  console.log("Rendering todo lists:", todoLists);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {todoLists.map((list) => (
        <div key={list.id} className="rounded-md bg-white p-4 shadow-md">
          <h2 className="mb-2 font-sans text-lg font-bold">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {list.title}
            </span>
          </h2>
          {/* Add buttons or links for viewing/editing/deleting each list */}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
