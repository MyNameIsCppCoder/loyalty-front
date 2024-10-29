// components/navbar/navbar.jsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import { Link as ScrollLink } from "react-scroll";
import { Menu, SquareX } from "lucide-react";

export const Navbar = ({ login }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navigateTo = (path) => {
    router.push(path);
    setIsOpen(false); // Закрыть меню после навигации
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`flex justify-between items-center text-teal-50 py-4 px-6 bg-black fixed w-full z-10 ${styles.navbar}`}>
      <div className="flex items-center">
        <p className="text-xl font-bold">Bkits</p>
      </div>

      {/* Кнопка бургер-меню (видна только на мобильных) */}
      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Меню">
          {isOpen ? <SquareX size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Навигационные ссылки (видны только на десктопах) */}
      <div className="hidden md:flex justify-between gap-7 w-1/3">
        <ScrollLink to="adventages" smooth={true} duration={500} className={`font-bold cursor-pointer ${styles.navEl}`}>
          Преимущества
        </ScrollLink>
        <ScrollLink to="expirience" smooth={true} duration={500} className={`font-bold cursor-pointer ${styles.navEl}`}>
          Пользование
        </ScrollLink>
        <ScrollLink to="auditories" smooth={true} duration={500} className={`font-bold cursor-pointer ${styles.navEl}`}>
          Для кого
        </ScrollLink>
      </div>

      {/* Ссылки для логина/регистрации или личного кабинета (видны только на десктопах) */}
      <div className="hidden md:flex gap-4">
        {login ? (
          <p className={`font-bold ${styles.navEl} cursor-pointer`} onClick={() => navigateTo("/cabinet")}>
            Личный кабинет
          </p>
        ) : (
          <div>
            <p className={`font-bold ${styles.navEl} cursor-pointer`} onClick={() => navigateTo("/login")}>
              Зайти
            </p>
            <p className={`font-bold ${styles.navEl} cursor-pointer`} onClick={() => navigateTo("/register")}>
              Регистрация
            </p>
          </div>
        )}
      </div>

      {/* Боковое меню (видно только на мобильных) */}
      <div className={`${styles.sideMenu} ${isOpen ? styles.sideMenuOpen : ""}`}>
        <div className="flex flex-col items-start p-6">
          {/* Ссылки внутри бокового меню */}
          <ScrollLink to="adventages" smooth={true} duration={500} className={`font-bold cursor-pointer mb-4 ${styles.navEl}`} onClick={toggleMenu}>
            Преимущества
          </ScrollLink>
          <ScrollLink to="expirience" smooth={true} duration={500} className={`font-bold cursor-pointer mb-4 ${styles.navEl}`} onClick={toggleMenu}>
            Пользование
          </ScrollLink>
          <ScrollLink to="auditories" smooth={true} duration={500} className={`font-bold cursor-pointer mb-4 ${styles.navEl}`} onClick={toggleMenu}>
            Для кого
          </ScrollLink>

          {/* Ссылки для логина/регистрации или личного кабинета */}
          {login ? (
            <p className={`font-bold cursor-pointer mt-4 ${styles.navEl}`} onClick={() => navigateTo("/cabinet")}>
              Личный кабинет
            </p>
          ) : (
            <div>
              <p className={`font-bold cursor-pointer mt-4 ${styles.navEl}`} onClick={() => navigateTo("/login")}>
                Зайти
              </p>
              <p className={`font-bold cursor-pointer mt-4 ${styles.navEl}`} onClick={() => navigateTo("/register")}>
                Регистрация
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Overlay для закрытия меню при клике вне его */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </nav>
  );
};
