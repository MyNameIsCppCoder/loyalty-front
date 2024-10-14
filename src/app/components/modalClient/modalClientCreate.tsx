import { ModalFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "@/interceptors/interceptors";
import React, { useRef } from "react";

export const formFields = [
	{
		label: "Имя",
		name: "name",
		type: "text",
		placeholder: "Введите ваше имя",
		validation: { required: "Имя обязательно" },
	},
	{
		label: "Телефон",
		name: "phone",
		type: "text",
		placeholder: "Введите ваш телефон",
		validation: { required: false },
	},
	{
		label: "Email",
		name: "email",
		type: "email",
		placeholder: "Введите ваш email",
		validation: { required: false },
	},
];

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const modalRef = useRef<HTMLDivElement>(null);

	// Функция для отправки данных на сервер через POST запрос
	const sendData = async (data: Record<string, any>) => {
		try {
			// Приведение данных к нужному формату (например, числа для cashbackPercentage)
			const processedData = {
				...data,
				cashbackPercentage: data.cashbackPercentage
					? Number(data.cashbackPercentage)
					: undefined,
			};

			// Отправляем POST запрос на сервер
			const res = await axiosWithAuth.post("clients/create", processedData);
			console.log("Data submitted successfully:", res.data);

			// Закрываем модальное окно после успешной отправки
			onClose();
		} catch (err) {
			console.error("Error while submitting data:", err);
		}
	};

	// Закрытие окна при клике вне его
	const handleOutsideClick = (event: React.MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			onClose();
		}
	};

	// Если окно не открыто, не рендерим его
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
					{formFields.map((field, index) => (
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
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalForm;
