import { useRouter } from "next/navigation";
import React from "react";

export const SuccessScreen = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/cabinet");
  };
  return (
    <div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-5 border border-black rounded-xl shadow py-4 px-5 w-fit h-fit text-center">
          <h2>Успешная оплата</h2>
          <p>Спасибо за приобритение!</p>
          <p>Выбранный вами тарриф оплачен</p>
          <button className="rounded-xl bg-gray-200" onClick={() => onClick()}>
            Личный кабинет
          </button>
        </div>
      </div>
    </div>
  );
};
