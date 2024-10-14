"use client";
import React from "react";
import ManagerCard from "../managerCard/managerCard";

interface Manager {
  id: number;
  username: string;
  name: string | null;
  email: string;
  updatedAt: string;
  createdAt: string;
}

interface ManagerListProps {
  managers: Manager[];
}

const ManagerList: React.FC<ManagerListProps> = ({ managers }) => {
  const handleUpdate = (managerId: number) => {
    console.log("Обновить менеджера с id:", managerId);
  };

  const handleDelete = (managerId: number) => {
    console.log("Удалить менеджера с id:", managerId);
  };
  return (
    <div className="overflow-y-auto max-h-[80vh] p-4">
      {managers.map((manager) => (
        <ManagerCard
          key={manager.id}
          manager={manager}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ManagerList;
