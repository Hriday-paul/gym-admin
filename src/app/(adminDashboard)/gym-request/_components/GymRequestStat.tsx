"use client"
import ErrorComponent from "@/components/shared/ErrorComponent";
import { CancelIcon, CheckIcon, ClockIcon, FilterIcon } from "@/icon";
import { useClaimStatsQuery } from "@/redux/api/claimReq.api";
import { Loader } from "lucide-react";
import React from "react";

export default function GymRequestStat() {

  const { isError, data, isLoading, isSuccess } = useClaimStatsQuery();

  const requestData = [
    {
      id: 1,
      name: "Total Requests",
      stat: isLoading ? <Loader size={20} className='text-main-color animate-spin' /> : isSuccess ? <p className="text-xl font-semibold">{data?.data?.total}</p> : 0,
      icon: <FilterIcon />,
      color: "#DBEAFE",
    },
    {
      id: 2,
      name: "Pending",
      stat: isLoading ? <Loader size={20} className='text-main-color animate-spin' /> : isSuccess ? <p className="text-xl font-semibold">{data?.data?.pending}</p> : 0,
      icon: <ClockIcon />,
      color: "#FEF9C2",
    },
    {
      id: 3,
      name: "Approved",
      stat: isLoading ? <Loader size={20} className='text-main-color animate-spin' /> : isSuccess ? <p className="text-xl font-semibold">{data?.data?.approved}</p> : 0,
      icon: <CheckIcon />,
      color: "#DCFCE7",
    },
    {
      id: 4,
      name: "Rejected",
      stat: isLoading ? <Loader size={20} className='text-main-color animate-spin' /> : isSuccess ? <p className="text-xl font-semibold">{data?.data?.rejected}</p> : 0,
      icon: <CancelIcon />,
      color: "#FFE2E2",
    },
  ];

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-10 md:gap-5 gap-3 ">
      {requestData.map((item) => (
        <div key={item.id} className="flex justify-between items-center gap-2 bg-[#fff] p-6 rounded-lg">
          <div className="space-y-1">
            <p className="text-sm text-[#4A5565]">{item.name}</p>
            {item?.stat}
          </div>

          <div
            className="w-10 h-10 flex justify-center items-center rounded-full"
            style={{ backgroundColor: item.color }}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
