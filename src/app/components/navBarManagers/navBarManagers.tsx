import styles from '@/app/components/navBarClient/navbar.module.css';

interface NavBarManagerProps {
  openModalCreate: () => void;
  openModalFind: () => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const NavBarManagers = ({openModalCreate,
                          openModalFind,
                          toggleSidebar,
                          isSidebarOpen}: NavBarManagerProps) => {

  return (
    <div className="flex items-center justify-between py-4 px-4 bg-black">
      {/* Кнопка для открытия сайдбара на мобильных устройствах */}
      <button
        className="md:hidden text-white p-2"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Закрыть меню" : "Открыть меню"}
      >
        {/* Иконка меняется в зависимости от состояния сайдбара */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <div className="flex flex-col w-full px-20 py-5 justify-between">
        <p className={'text-white text-3xl text-center'}>
          Информация о менеджерах и настройки
        </p>
        <p
          className={`text-white cursor-pointer w-fit ${styles.navEl}`}
          onClick={openModalCreate}
        >
          Добавить
        </p>
      </div>
    </div>
  );
}

export default NavBarManagers;