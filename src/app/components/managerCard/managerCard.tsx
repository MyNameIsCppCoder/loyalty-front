"use client";
import React, { useState } from "react";

interface Manager {
  id: number;
  username: string;
  name: string | null;
  email: string;
  updatedAt: string;
  createdAt: string;
}

interface ManagerCardProps {
  manager: Manager;
  onUpdate: (managerId: number) => void;
  onDelete: (managerId: number) => void;
}

const ManagerCard: React.FC<ManagerCardProps> = ({ manager, onUpdate, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            {manager.name || manager.username}
          </h3>
          <p className="text-gray-600">{manager.email}</p>
        </div>
        <button
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Скрыть информацию" : "Показать информацию"}
        </button>
      </div>
      {showDetails && (
        <div className="mt-4">
          <p>Дата создания: {new Date(manager.createdAt).toLocaleDateString()}</p>
          <div className="flex mt-4 space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => onUpdate(manager.id)}
            >
              Обновить
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => onDelete(manager.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerCard;
