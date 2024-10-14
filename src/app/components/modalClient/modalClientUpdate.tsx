"use client";

import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosWithAuth } from "@/interceptors/interceptors";
import { ClientUpdate } from "@/types/types";

interface ModalProps {
	isActive: boolean;
	onClose: () => void;
	setNewClient: Function;
	oldClient: any;
	id: number;
}

export const ModalClientUpdate: React.FC<ModalProps> = ({
	isActive,
	onClose,
	id,
	setNewClient,
	oldClient,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ClientUpdate>();

	const modalRef = useRef<HTMLDivElement>(null);

	const sendData: SubmitHandler<ClientUpdate> = async (data) => {
		try {
			// Преобразуем birthDate из строки в ISO-формат даты, если оно заполнено
			const payload: ClientUpdate = {
				...data,
				birthDate: data.birthDate
					? new Date(data.birthDate).toISOString()
					: undefined,
				cashbackPercentage:
					data.cashbackPercentage !== undefined &&
					data.cashbackPercentage !== ""
						? Number(data.cashbackPercentage)
						: undefined,
			};
			for (let key in payload) {
				if (payload[key] === undefined || payload[key] === "") {
					delete payload[key];
				}
			}
			console.log(payload);
			const res = await axiosWithAuth.put(`clients/${id}`, payload);

			onClose();
		} catch (err) {
			console.log("Error while sending", err);
		}
	};

	const handleOutsideClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			onClose();
		}
	};

	if (!isActive) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
			onClick={handleOutsideClick}
		>
			<div
				className="bg-white rounded-lg p-6 w-96 shadow-lg"
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-xl font-semibold mb-4">
					Обновить информацию о клиенте
				</h2>
				<form onSubmit={handleSubmit(sendData)}>
					<div className="mb-4">
						<label className="block mb-2">Имя</label>
						<input
							type="text"
							className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded`}
							{...register("name")}
							placeholder="Введите имя"
						/>
						{errors.name && (
							<span className="text-red-500 text-sm">
								{errors.name.message}
							</span>
						)}
					</div>

					<div className="mb-4">
						<label className="block mb-2">Телефон</label>
						<input
							type="tel"
							className={`w-full p-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded`}
							{...register("phone", {
								pattern: {
									value: /^\+?[1-9]\d{1,14}$/,
									message: "Некорректный номер телефона",
								},
							})}
							placeholder="Введите телефон"
						/>
						{errors.phone && (
							<span className="text-red-500 text-sm">
								{errors.phone.message}
							</span>
						)}
					</div>

					<div className="mb-4">
						<label className="block mb-2">Почта</label>
						<input
							type="email"
							className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`}
							{...register("email", {
								pattern: {
									value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
									message: "Некорректный адрес почты",
								},
							})}
							placeholder="Введите почту"
						/>
						{errors.email && (
							<span className="text-red-500 text-sm">
								{errors.email.message}
							</span>
						)}
					</div>

					<div className="mb-4">
						<label className="block mb-2">Дата рождения</label>
						<input
							type="date"
							className={`w-full p-2 border ${errors.birthDate ? "border-red-500" : "border-gray-300"} rounded`}
							{...register("birthDate", {
								validate: (value) =>
									value === "" ||
									!isNaN(new Date(value).getTime()) ||
									"Некорректная дата",
							})}
							placeholder="Введите дату рождения"
						/>
						{errors.birthDate && (
							<span className="text-red-500 text-sm">
								{errors.birthDate.message}
							</span>
						)}
					</div>

					<div className="mb-4">
						<label className="block mb-2">Процент кешбэка</label>
						<input
							type="number"
							className={`w-full p-2 border ${errors.cashbackPercentage ? "border-red-500" : "border-gray-300"} rounded`}
							{...register("cashbackPercentage", {
								min: {
									value: 0,
									message: "Процент не может быть отрицательным",
								},
								max: {
									value: 100,
									message: "Процент не может превышать 100",
								},
								required: false,
							})}
							placeholder="Введите процент кешбэка"
						/>
						{errors.cashbackPercentage && (
							<span className="text-red-500 text-sm">
								{errors.cashbackPercentage.message}
							</span>
						)}
					</div>

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
							Обновить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
