"use client";

import { IAuthType } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from '@/interceptors/interceptors';

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IAuthType>();

  const onSubmit = async (data: IAuthType) => {
    const dataToSend = {
      username: data.username,
      password: data.password,
      email: data.email,
    };
    try {
      const response = await axiosWithAuth.post("users/register", dataToSend);
      console.log(response.data);
      router.push("login");
    } catch (error) {
      // @ts-ignore
      if (error.response && error.response.status === 401) {
        console.error("Ошибка регистрации: авторизация не удалась.");
      } else {
        console.error("Ошибка регистрации:", error);
      }
    }
  };
  const password = watch("password");

  function submitBack() {
    router.push(`/`);
  }

  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border border-gray-200 bg-gray-200 py-5 px-6 rounded-2xl"
      >
        <div className="flex flex-col items-center my-2">
          <label>Почта</label>
          <input
            type="email"
            {...register("email", {
              required: "Это поле обязательно",
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
          <label>Имя пользователя</label>
          <input
            {...register("username", { required: "Введите имя пользователя" })}
            className="rounded bg-blue-50"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className="flex flex-col items-center my-2">
          <label>Пароль</label>
          <input
            type="password"
            {...register("password", { required: "Введите пароль" })}
            className="rounded bg-blue-50"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className="flex flex-col items-center my-2">
          <label>Повторите пароль</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Повторите пароль",
              validate: (value) => value === password || "Пароли не совпадают",
            })}
            className="rounded bg-blue-50"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex gap-5 mt-5">
          <button
            type="submit"
            className="border bg-teal-500 text-white px-3 py-2 rounded"
          >
            Зарегистрироваться
          </button>
          <button
            type="reset"
            onClick={() => submitBack()}
            className="border bg-gray-500 text-white px-3 py-2 rounded"
          >
            Назад
          </button>
        </div>
      </form>
    </div>
  );
}
