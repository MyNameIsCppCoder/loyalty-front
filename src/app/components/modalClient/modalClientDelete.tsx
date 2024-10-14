import { axiosWithAuth } from "@/interceptors/interceptors";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

interface ModalProps {
	isOpen: {
		isOpen: boolean;
		id: string;
	};
	onClose: () => void;
	client: any;
}
export const ModalClientDelete: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	client,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.targer === event.currentTarger) {
			onClose();
		}
	};
	const router = useRouter();
	const sendData = async () => {
		const url = `clients/${client.id}`;
		console.log(url);
		try {
			const res = await axiosWithAuth.delete(url);
			console.log("Success deleted user ", res);
			onClose();
			router.push("/clients/");
		} catch (err) {
			console.log("I am sorry");
		}
	};
	if (!isOpen.isOpen) return null;
	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
			onClick={handleOutsideClick}
		>
			<div className="bg-white rounded-lg p-6 w-96 shadow-lg" ref={modalRef}>
				<h2 className="text-xl font-semibold mb-4">
					Вы действительно хотите удалить {client.name}
				</h2>
				<div className="flex justify-between mt-5">
					<button
						type="button"
						onClick={() => sendData()}
						className="bg-teal-500 text-white px-4 py-2 rounded"
					>
						Ок
					</button>
					<button
						onClick={() => onClose()}
						className="bg-gray-500 text-white px-4 py-2 rounded"
					>
						Отмена
					</button>
				</div>
			</div>
		</div>
	);
};
