import { axiosWithAuth } from "@/interceptors/interceptors";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface FormData {
  amount: number;
}
interface ModalClientAddPurchaseProps {
  isOpen: {
    isOpen: boolean;
    id: string;
  };
  onClose: () => void;
  setNewClient: Function;
  oldClient: any;
}
const ModalClientAddPurchase: React.FC<ModalClientAddPurchaseProps> = ({
  isOpen,
  onClose,
  setNewClient,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const modalRef = useRef<HTMLDivElement>(null);

  const sendData: SubmitHandler<FormData> = async (data: { amount: any }) => {
    try {
      let params = new URLSearchParams();
      params.append("amount", data.amount);
      const url = `purchase/create/${isOpen.id}?${params.toString()}`;
      console.log(url);
      const res = await axiosWithAuth.post(url, { amount: data.amount });
      onClose();
    } catch (err) {
      console.error("Error while adding purchase:", err);
    }
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen.isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg" ref={modalRef}>
        <h2 className="text-xl font-semibold mb-4">Добавить покупку</h2>
        <form onSubmit={handleSubmit(sendData)}>
          <div className="mb-4">
            <label className="block mb-2">Сумма</label>
            <input
              type="number"
              className={`w-full p-2 border ${errors.amount ? "border-red-500" : "border-gray-300"} rounded`}
              {...register("amount", {
                required: "Введите сумму",
                min: { value: 1, message: "Сумма должна быть больше 0" },
              })}
              placeholder="Введите сумму"
            />
            {errors.amount && (
              <span className="text-red-500 text-sm">
                {errors.amount.message as string}
              </span>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => onClose()}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalClientAddPurchase;
