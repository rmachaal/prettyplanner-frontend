import { createTodoList } from "@/app/api/plannerApi";
import React, { useState } from "react";

interface CreateTodoListModalProps {
  onClose: () => void; // onClose prop should be a function that takes no parameters and returns void
}

const CreateTodoListModal: React.FC<CreateTodoListModalProps> = ({
  onClose,
}) => {
  const [title, setTitle] = useState("");

  const handleCreateList = async () => {
    try {
      await createTodoList(title);
      console.log("Successfully created todo list");
      onClose(); // Call onClose function provided by parent component
    } catch (error) {
      console.error("Error creating todo list:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Create New To-Do List</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list title"
          className="mb-4 w-full rounded-md border border-gray-300 p-2"
        />
        <div className="flex justify-end">
          <button
            onClick={handleCreateList}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="ml-2 rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodoListModal;
