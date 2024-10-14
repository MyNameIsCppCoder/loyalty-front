import React from "react";
import { useRouter } from "next/navigation";
import styles from "./navbar.module.css";

export const Navbar = ({ login }) => {
  const router = useRouter();
  return (
    <nav className="flex justify-between text-teal-50 py-10 px-10">
      <p>Btools</p>
      <div className={"flex justify-between gap-7 w-1/3"}>
        <p className={`font-bold ${styles.navEl}`}>О нас</p>
        <p className={`font-bold ${styles.navEl}`}>Польза</p>
        <p className={`font-bold ${styles.navEl}`}>Попробовать</p>
      </div>
      {login ? (
        <div className={"flex gap-4"}>
          <p
            className={`font-bold ${styles.navEl}`}
            onClick={() => router.push("/cabinet")}
          >
            Личный кабинет
          </p>
        </div>
      ) : (
        <div className={"flex gap-4"}>
          <p
            className={`font-bold ${styles.navEl}`}
            onClick={() => router.push("/login")}
          >
            Зайти
          </p>
          <p
            className={`font-bold ${styles.navEl}`}
            onClick={() => router.push("/register")}
          >
            Регистрация
          </p>
        </div>
      )}
    </nav>
  );
};
