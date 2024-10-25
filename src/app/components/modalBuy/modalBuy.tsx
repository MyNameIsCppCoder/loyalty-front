import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalBuy = ({ children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Полупрозрачный фон */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      {/* Содержимое модального окна */}
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-lg w-full">
        {/* Кнопка закрытия */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalBuy;
