"use client";
import LoadingScreen from "@/app/components/loading/loading";
import { SuccessScreen } from "@/app/components/successScreen/successScreen";
import { axiosWithAuth } from "@/interceptors/interceptors";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const params = useParams();
  const id = params.id;
  const countMonth = params.countMonth;
  const createdAt = params.createdAt.split("?")[0];
  const [isSuccess, setIsSuccess] = useState(false);
  console.log(id, countMonth, createdAt);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosWithAuth.get(`bank/make-success/${id}/${countMonth}/${createdAt}`);
        if (res.data) setIsSuccess(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  return <div>{isSuccess !== true ? <LoadingScreen /> : <SuccessScreen />}</div>;
};
export default SuccessPage;
