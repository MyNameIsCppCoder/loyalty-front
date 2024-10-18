import React, { useEffect, useState } from "react";
import { ModalUserUpdate } from "../users/ModalUserUpdate";
import { axiosWithAuth } from "@/interceptors/interceptors";
import { ChangePassword } from "../changePassword/changePassword";

export const Settings = ({}) => {
  const [user, setUser] = useState({ id: 9 });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axiosWithAuth("users/find");
        setUser(user.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="divide-sky-100 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Настройки</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => {
            setShowUpdateForm(!showUpdateForm);
            setShowChangePasswordForm(false);
          }}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200">
          Обновить данные
        </button>
        <button
          onClick={() => {
            setShowChangePasswordForm(!showChangePasswordForm);
            setShowUpdateForm(false);
          }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-200">
          Поменять пароль
        </button>
      </div>

      <div className="mt-6 w-full">
        {showUpdateForm && (
          <div className="animate-slide-down">
            <ModalUserUpdate id={user.id} />
          </div>
        )}
        {showChangePasswordForm && (
          <div className="animate-slide-down">
            <ChangePassword />
          </div>
        )}
      </div>
    </div>
  );
};
