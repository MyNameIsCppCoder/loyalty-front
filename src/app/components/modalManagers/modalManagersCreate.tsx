import { useForm } from 'react-hook-form';
import React, { useRef } from 'react';
import { axiosWithAuth } from '@/interceptors/interceptors';
import { formFields } from '@/app/components/modalClient/modalClientCreate';

export const formField = [
  {
    label: "Почта",
    name: "email",
    type: "text",
    placeholder: "Введите почту менеджера",
    validation: { required: "Почта обязательна" },
  },
  {
    label: "Никнейм пользователя",
    name: "username",
    type: "text",
    placeholder: "Введите никнейм",
    validation: { required: 'Имя пользователя обязательно' },
  },
  {
    label: "Пароль",
    name: "password",
    type: "text",
    placeholder: "Введите пароль для пользователя",
    validation: { required: 'Пароль обязателен' },
  }
];

interface ModalManagersCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ICreateManager {
  username: string;
  password: string;
  email: string;
}

const ModalManagersCreate = ({isOpen, onClose}: ModalManagersCreateProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateManager>();
  const modalRef = useRef<HTMLDivElement>(null);

  const sendData = async (data: Record<string, any>) => {
    try {
      console.log(data)
      const res = await axiosWithAuth.post('manager/create', data)
      onClose()
    } catch (error) {
      console.log(error, ' is occured')
    }
  }

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
        <h2 className="text-xl font-semibold mb-4">Заполните форму</h2>
        <form onSubmit={handleSubmit(sendData)}>
          {/* Генерация полей формы на основе переданного formFields */}
          {formField.map((field, index) => (
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

          {/* Buttons */}
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
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalManagersCreate;