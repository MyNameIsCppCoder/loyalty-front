"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { steps } from "./stepsData";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMediaQuery } from "react-responsive";

const LandingSteps = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="bg-black py-10" id="expirience">
      <h2 className="text-4xl text-white text-center mb-10">Порядок взаимодействия с нашим сервисом</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={!isMobile}
        height={200}
        pagination={!isMobile && { clickable: true } && { dynamicBullets: true, type: "progressbar" }}
        spaceBetween={100}
        slidesPerView={1}
        className="w-full max-w-3xl mx-auto bg-white rounded">
        {steps.map((step, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center m-10 w-fit h-2/6">
              {step.image && step.image}
              <h3 className="text-2xl  font-bold mb-4">{step.title}</h3>
              <p className=" text-lg">{step.description}</p>
              <p className="text-xl ">{step.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingSteps;
