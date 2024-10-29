"use client";
import LandingMain from "./components/advantages/advantages";
import React from "react";
import { Navbar } from "@/app/components/navbar/navbar";
import { axiosWithAuth } from "@/interceptors/interceptors";
import { useEffect, useState } from "react";
import { LandingAdvantages } from "./components/landingAdventages/landingAdvantages";
import { LandingAuditories } from "./components/LandingAuditories/LandingAuditories";
import { LandingFooter } from "./components/LandingFooter/LandingFooter";
import dynamic from "next/dynamic";
import { LandingYM } from "./components/landingYM/landingYM";
const LandingSteps = dynamic(() => import("./components/landingSteps/landingSteps"), { ssr: false });

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
    <div>
      <main className="bg-black">
        <Navbar login={login} />
        <LandingMain />
        <LandingAdvantages />
        <LandingSteps />
        <LandingAuditories />
        <LandingYM />
      </main>
      <footer className="bg-black">
        <LandingFooter />
      </footer>
    </div>
  );
}
