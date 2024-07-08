"use client";

import React, { useState } from "react";
import TodoList from "./TodoList";
import CreateTodoListModal from "./CreateTodoListWindow";

export default function Planner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="text-primary flex min-h-screen flex-col items-center justify-between p-24 font-sans">
      <div className="mb-8 w-full max-w-5xl">
        <h1 className="text-s text-primary mb-4 font-semibold">
          My To-Do Lists
        </h1>
        <TodoList />
        <button
          onClick={openModal}
          className="mt-6 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-2 text-white transition-all duration-300 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
        >
          <p className="text-xs">Create New List</p>
        </button>
        {isModalOpen && <CreateTodoListModal onClose={closeModal} />}
      </div>
    </main>
  );
}
