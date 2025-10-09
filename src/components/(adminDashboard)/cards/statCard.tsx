import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

type TProps = {
  title: string;
  growth: string;
  amount: string;
  days: string;
  increase: boolean;
};

export default function StatCard({
  title,
  growth,
  amount,
  days,
  increase,
}: TProps) {
  return (
    <div className="flex flex-col xl:gap-y-2 gap-y-1  justify-center p-6  flex-1 bg-section-bg rounded-xl ">
      <div className="flex justify-between items-center">
        <h3 className=" xl:text-xl text-base text-[#212529] truncate">{title}</h3>
        <h1
          className={cn("flex", increase ? "text-[#165940]" : "text-[#5F1011]")}
        >
          {increase ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
          {growth}
        </h1>
      </div>
      <p className="xl:text-3xl lg:text-2xl text-xl font-medium ">{amount}</p>

      <h6 className="text-[#7F7F7F]">Last {days} days</h6>
    </div>
  );
}
