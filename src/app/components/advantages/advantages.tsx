import React, { Component } from "react";
import pic from "../../../public/landing/industry.svg";
import Image from "next/image";

export const LandingMain = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen justify-center items-center lg:justify-center px-5">
      <div className="w-full lg:w-1/2 lg:absolute left-0 top-1/3 mx-4 my-10">
        <h1 className="text-4xl font-bold text-white text-center mt-8">Увеличьте лояльность клиентов с минимальными усилиями!</h1>
        <h4 className="text-xl text-white text-center mt-8">
          С помощью нашей программы лояльности вы сможете возвращать клиентов снова и снова, увеличивать их средний чек и выстраивать прочные отношения с вашей аудиторией.
        </h4>
      </div>
      <div className="hidden sm:block">
        <Image src={pic} alt="Industry" className="border-l-yellow-50 absolute bottom-0 right-10 w-1/3" width={500} height={500} />
      </div>
      {/* Блок с изображением для мобильных устройств */}
      <div className="block sm:hidden flex justify-center items-center h-full">
        <Image src={pic} alt="Industry" className="w-2/3 h-auto" width={500} height={500} />
      </div>
    </div>
  );
};

export default LandingMain;
