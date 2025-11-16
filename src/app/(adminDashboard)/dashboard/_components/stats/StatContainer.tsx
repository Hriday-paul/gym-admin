"use client"
import ErrorComponent from "@/components/shared/ErrorComponent";
import { useUserStatsQuery } from "@/redux/api/dashboard.api";
import { Loader } from "lucide-react";
import React from "react";

const userData = {
  id: 1,
  title: "Total Users",
  increase: false,
  days: "30",
  growth: "12%",
}

const gymData = {
  id: 2,
  title: "Total Gyms",
  increase: true,
  days: "30",
  growth: "12%",
}

export default function StatContainer() {

  const { isLoading, isError, data } = useUserStatsQuery({}, { refetchOnMountOrArgChange: true });

  if (isError) return <ErrorComponent />

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-5 gap-3">
      <div className="flex flex-col xl:gap-y-2 gap-y-1  justify-center p-6  flex-1 bg-section-bg rounded-xl ">
        <div className="flex justify-between items-center">
          <h3 className=" xl:text-xl text-base text-[#212529] truncate">Total Users</h3>
        </div>
        {isLoading ? <Loader size={25} className='text-main-color animate-spin' /> : <p className="xl:text-3xl lg:text-2xl text-xl font-medium ">{data?.data?.totalUsers || 0}</p>}

        {/* <h6 className="text-[#7F7F7F]">Last {days} days</h6> */}
      </div>
      <div className="flex flex-col xl:gap-y-2 gap-y-1  justify-center p-6  flex-1 bg-section-bg rounded-xl ">
        <div className="flex justify-between items-center">
          <h3 className=" xl:text-xl text-base text-[#212529] truncate">Total GYM</h3>
        </div>
        {isLoading ? <Loader size={25} className='text-main-color animate-spin' /> : <p className="xl:text-3xl lg:text-2xl text-xl font-medium ">{data?.data?.totalGym || 0}</p>}

        {/* <h6 className="text-[#7F7F7F]">Last {days} days</h6> */}
      </div>
    </div>
  );
}
