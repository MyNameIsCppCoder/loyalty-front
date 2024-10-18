// src/components/users/ModalUserUpdate.tsx

import { axiosWithAuth } from "@/interceptors/interceptors";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChangePassword } from "../changePassword/changePassword";

interface UpdateUserDto {
  email?: string;
  name?: string;
  username?: string;
}

export const ModalUserUpdate: React.FC<{ id: number }> = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserDto>();

  useEffect(() => {
    // Получаем данные пользователя при загрузке компонента
    const fetchUserData = async () => {
      try {
        const res = await axiosWithAuth.get("users/profile");
        const userData = res.data;
        setValue("email", userData.email);
        setValue("name", userData.name);
        setValue("username", userData.username);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };

    fetchUserData();
  }, [setValue]);

  const submitForm = async (data: UpdateUserDto) => {
    try {
      const res = await axiosWithAuth.put("users/update", data);
      console.log(res.data, "Данные пользователя обновлены");
    } catch (err) {
      console.log("Ошибка при обновлении данных пользователя", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
        <div className="flex flex-col items-center my-2">
          <label>Почта</label>
          <input
            type="email"
            {...register("email", {
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Введите корректный email",
              },
            })}
            className="rounded bg-blue-50"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="flex flex-col items-center my-2">
          <label>Имя</label>
          <input type="text" {...register("name")} className="rounded bg-blue-50" />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="flex flex-col items-center my-2">
          <label>Логин</label>
          <input type="text" {...register("username")} className="rounded bg-blue-50" />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-fit mx-auto">
          Обновить данные
        </button>
      </form>
    </div>
  );
};
