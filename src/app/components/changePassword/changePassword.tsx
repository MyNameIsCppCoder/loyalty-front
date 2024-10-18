// src/components/users/ChangePassword.tsx

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "@/interceptors/interceptors";

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  verificationCode?: string;
}

export const ChangePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>();
  const [verificationNeeded, setVerificationNeeded] = useState(false);
  const [secretNumber, setSecretNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Получаем email пользователя
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const res = await axiosWithAuth.get("users/profile");
        setUserEmail(res.data.email);
      } catch (error) {
        console.error("Ошибка при получении email пользователя:", error);
      }
    };

    fetchUserEmail();
  }, []);

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      // Проверяем старый пароль
      const res = await axiosWithAuth.post("auth/check-pass", {
        password: data.oldPassword,
      });

      if (res.status === 200) {
        // Проверяем совпадение нового пароля и подтверждения
        if (data.newPassword === data.confirmPassword) {
          // Генерируем секретный код
          const generatedSecretNumber = Math.floor(10000 + Math.random() * 90000).toString();
          setSecretNumber(generatedSecretNumber);

          // Отправляем код на почту пользователя
          await axiosWithAuth.post("mail/verify", {
            secretNumber: generatedSecretNumber,
            to: userEmail,
          });

          setVerificationNeeded(true);
        } else {
          alert("Новый пароль и подтверждение не совпадают.");
        }
      } else {
        alert("Неверный старый пароль.");
      }
    } catch (error) {
      console.error("Ошибка при проверке пароля:", error);
      alert("Ошибка при проверке пароля.");
    }
  };

  const onVerify = async (data: ChangePasswordForm) => {
    if (data.verificationCode === secretNumber) {
      try {
        // Изменяем пароль пользователя
        await axiosWithAuth.post(`change-pass/${secretNumber}/`, {
          newPassword: data.newPassword,
        });

        alert("Пароль успешно изменен.");
        // Сброс состояния
        setVerificationNeeded(false);
        reset();
      } catch (error) {
        console.error("Ошибка при изменении пароля:", error);
        alert("Ошибка при изменении пароля.");
      }
    } else {
      alert("Неверный код подтверждения.");
    }
  };

  return (
    <div>
      {!verificationNeeded ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col items-center my-2">
            <label>Старый пароль</label>
            <input type="password" {...register("oldPassword", { required: "Введите старый пароль" })} className="rounded bg-blue-50" />
            {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
          </div>
          <div className="flex flex-col items-center my-2">
            <label>Новый пароль</label>
            <input type="password" {...register("newPassword", { required: "Введите новый пароль" })} className="rounded bg-blue-50" />
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </div>
          <div className="flex flex-col items-center my-2">
            <label>Подтвердите новый пароль</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Подтвердите новый пароль",
                validate: (value) => value === watch("newPassword") || "Пароли не совпадают",
              })}
              className="rounded bg-blue-50"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-fit mx-auto">
            Проверить и отправить код
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onVerify)} className="flex flex-col">
          <p className="mb-4">Код подтверждения отправлен на вашу почту. Пожалуйста, введите его ниже:</p>
          <div className="flex flex-col items-center my-2">
            <label>Код подтверждения</label>
            <input
              type="text"
              {...register("verificationCode", {
                required: "Введите код подтверждения",
              })}
              className="rounded bg-blue-50"
            />
            {errors.verificationCode && <p>{errors.verificationCode.message}</p>}
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-fit mx-auto">
            Подтвердить и сменить пароль
          </button>
        </form>
      )}
    </div>
  );
};
