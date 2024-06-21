import React from "react";

interface ListItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  listTitle: string;
  listItems: { id: number; content: string }[]; 
}

const ListItemsModal = ({
  isOpen,
  onClose,
  listTitle,
  listItems,
}: ListItemsModalProps) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">{listTitle}</h2>
        <ul>
          {listItems.map((item) => (
            <li key={item.id} className="mb-2">
              {item.content}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ListItemsModal;
