"use client";

import React, { useState } from "react";
import TodoList from "./TodoList";
import CreateTodoListModal from "./CreateTodoListWindow";

export default function Planner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font-sans text-primary">
      <div className="max-w-5xl w-full mb-8">
        <h1 className="text-xl font-semibold mb-4 text-primary">
          My To-Do Lists
        </h1>
        <TodoList />
        <button
          onClick={openModal}
          className="mt-6 text-white px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300"
        >
          Create New List
        </button>
        {isModalOpen && <CreateTodoListModal onClose={closeModal} />}
      </div>
    </main>
  );
}
