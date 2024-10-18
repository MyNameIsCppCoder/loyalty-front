"use client";

import { IAuthType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "@/interceptors/interceptors";
import { useState, useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IAuthType>();
  const [verificationSent, setVerificationSent] = useState(false);
  const [secretNumber, setSecretNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorVerify, setErrorVerify] = useState(false);

  // Таймер для повторной отправки кода
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canResend && verificationSent) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [canResend, verificationSent]);

  const onSubmit = async (data: IAuthType) => {
    // Генерируем пятизначный секретный код
    const generatedSecretNumber = Math.floor(10000 + Math.random() * 90000).toString();

    // Сохраняем код и email в состоянии
    setSecretNumber(generatedSecretNumber);
    setUserEmail(data.email);

    try {
      // Отправляем код подтверждения на почту пользователя
      await axiosWithAuth.post("mail/verify", {
        secretNumber: generatedSecretNumber,
        to: data.email,
      });

      // Устанавливаем флаг, что код отправлен
      setVerificationSent(true);
      setCanResend(false);
      setResendTimer(60);

      // Сбрасываем форму, если нужно
      // reset();
    } catch (error) {
      console.error("Ошибка при отправке кода подтверждения:", error);
    }
  };

  const onVerifyCode = async () => {
    if (verificationCode === secretNumber) {
      try {
        // Регистрируем пользователя
        const dataToSend = {
          username: watch("username"),
          password: watch("password"),
          email: userEmail,
        };

        await axiosWithAuth.post("users/register", dataToSend);
        setErrorVerify(false);
        // Перенаправляем на страницу входа
        router.push("login");
      } catch (error) {
        console.error("Ошибка регистрации:", error);
      }
    } else {
      setErrorVerify(true);
    }
  };

  const handleResendCode = async () => {
    if (canResend) {
      const generatedSecretNumber = Math.floor(10000 + Math.random() * 90000).toString();
      setSecretNumber(generatedSecretNumber);
      setCanResend(false);
      setResendTimer(60);

      try {
        await axiosWithAuth.post("mail/verify", {
          secretNumber: generatedSecretNumber,
          to: userEmail,
        });
      } catch (error) {
        console.error("Ошибка при повторной отправке кода:", error);
      }
    }
  };

  const password = watch("password");

  function submitBack() {
    router.push(`/`);
  }

  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center min-h-screen">
      {!verificationSent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col border border-gray-200 bg-gray-200 py-5 px-6 rounded-2xl">
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
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col items-center my-2">
            <label>Имя пользователя</label>
            <input {...register("username", { required: "Введите имя пользователя" })} className="rounded bg-blue-50" />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>

          <div className="flex flex-col items-center my-2">
            <label>Пароль</label>
            <input type="password" {...register("password", { required: "Введите пароль" })} className="rounded bg-blue-50" />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
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
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex gap-5 mt-5">
            <button type="submit" className="border bg-teal-500 text-white px-3 py-2 rounded">
              Отправить код подтверждения
            </button>
            <button type="reset" onClick={() => submitBack()} className="border bg-gray-500 text-white px-3 py-2 rounded">
              Назад
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col border border-gray-200 bg-gray-200 py-5 px-6 rounded-2xl">
          <p className="mb-4">Код подтверждения отправлен на {userEmail}. Пожалуйста, введите его ниже:</p>
          <div className="flex flex-col items-center my-2">
            <label>Код подтверждения</label>
            <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="rounded bg-blue-50 p-2 mt-2" />
            {errorVerify ? <p className="text-red-500 text-xl">Неверный код</p> : <></>}
          </div>
          <div className="flex justify-center gap-5 mt-5">
            <button onClick={onVerifyCode} className="border bg-teal-500 text-white px-3 py-2 rounded">
              Подтвердить код
            </button>
            <button onClick={handleResendCode} className={`border bg-gray-500 text-white px-3 py-2 rounded ${!canResend ? "opacity-50 cursor-not-allowed" : ""}`} disabled={!canResend}>
              {canResend ? "Отправить новый код" : `Отправить новый код (${resendTimer}s)`}
            </button>
            <button
              onClick={() => {
                // Позволяет вернуться и изменить email или другие данные
                setVerificationSent(false);
                setVerificationCode("");
              }}
              className="border bg-gray-500 text-white px-3 py-2 rounded ">
              Изменить данные
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
