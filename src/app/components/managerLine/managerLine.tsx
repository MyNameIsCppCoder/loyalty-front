"use client";
import { useRouter } from "next/navigation";
import React from "react";
import ManagerList from '@/app/components/managerList/managerList';

interface Manager {
  id: number;
  username: string;
  name: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const ManagerLine: React.FC<{ managers: Manager[] }> = ({ managers }) => {
  const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <ManagerList managers={managers} />
    </div>
  );
};

export default ManagerLine;