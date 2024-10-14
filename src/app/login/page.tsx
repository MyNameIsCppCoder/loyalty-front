"use client";
import { axiosWithAuth } from "@/interceptors/interceptors";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from 'react';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(false)
  const router = useRouter();
  const onSubmit = async (data: any) => {
    const dataToSend = {
      email: data.email,
      password: data.password,
    };
    console.log(dataToSend)
    try {
      const req = await axiosWithAuth.post("auth/login", dataToSend);
      localStorage.setItem("accessToken", req.data.accessToken);
      router.push("cabinet/");
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Ошибка авторизации: неверный логин или пароль");
      } else {
        console.error("Error during login:", error);
      }
    }
  };

  function submitBack() {
    router.push("/");
  }

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-200 bg-gray-200 flex flex-col justify-center items-center p-10 rounded-2xl"
      >
        <div className="flex flex-col items-center gap-4 py-5">
          <label>Почта</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="rounded bg-blue-50"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="flex flex-col items-center gap-4 py-5">
          <label>Пароль</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="rounded bg-blue-50"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className="flex gap-5">
          <button
            type="submit"
            className="border bg-teal-500 text-white px-3 py-2 rounded"
          >
            Войти
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
