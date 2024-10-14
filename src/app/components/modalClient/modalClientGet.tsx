import { axiosWithAuth } from "@/interceptors/interceptors";
import { ModalFormProps } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const formFind = [
  {
    label: "Номер телефона",
    name: "number",
    type: "text",
    placeholder: "Введите номер",
    validation: { required: false },
  },
  {
    label: "Почта",
    name: "email",
    type: "text",
    placeholder: "Введите почту",
    validation: { required: false },
  },
];

const ModalClientGet: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const modalRef = useRef<HTMLDivElement>(null);
  const sendData = async (data: Record<string, any>) => {
    try {
      const params = new URLSearchParams();

      // Добавляем в query параметры телефон и почту, если они заполнены
      if (data.number) {
        params.append("phone", data.number);
      }

      if (data.email) {
        params.append("email", data.email);
      }
      const res = await axiosWithAuth.get(
        `${"clients/current/"}?${params.toString()}`,
      );
      router.push(`clients/current/${res.data.id}`);

      // Закрываем окно после успешного поиска
      onClose();
    } catch (err) {
      console.error("Error while searching for client:", err);
    }
  };

  // Закрытие окна при клике вне его
  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg" ref={modalRef}>
        <h2 className="text-xl font-semibold mb-4">Поиск клиента</h2>
        <form onSubmit={handleSubmit(sendData)}>
          {/* Генерация полей формы на основе переданного formFields */}
          {formFind.map((field, index) => (
            <div className="mb-4" key={index}>
              <label className="block mb-2">{field.label}</label>
              <input
                type={field.type}
                className={`w-full p-2 border ${errors[field.name] ? "border-red-500" : "border-gray-300"} rounded`}
                {...register(field.name, field.validation)}
                placeholder={field.placeholder}
              />
              {errors[field.name] && (
                <span className="text-red-500 text-sm">
                  {errors[field.name]?.message as string}
                </span>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded"
            >
              Найти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalClientGet;
