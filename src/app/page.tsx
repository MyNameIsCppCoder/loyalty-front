"use client";
import Advantages from "@/app/components/advantages/advantages";
import { Navbar } from "@/app/components/navbar/navbar";
import { axiosWithAuth } from "@/interceptors/interceptors";
import { useEffect, useState } from "react";

export default function Home() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const res = await axiosWithAuth.get("auth/check-token/");
          if (res.status === 200) {
            setLogin(true);
          } else {
            setLogin(false);
            console.log(res);
          }
        } catch (error) {
          console.error("Token check failed:", error);
          setLogin(false);
        }
      } else {
        setLogin(false);
      }
    };

    checkAuth(); // Вызов функции
  }, []); // Зависимость пустая, чтобы запускать при монтировании

  return (
    <>
      <main className="bg-black">
        <Navbar login={login} />
        <Advantages />
      </main>
    </>
  );
}
