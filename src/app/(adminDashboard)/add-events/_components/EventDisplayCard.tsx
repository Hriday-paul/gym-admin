"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { message, Popconfirm, PopconfirmProps } from "antd";
import moment from "moment";
import { useState } from "react";
import { IEvent } from "@/redux/types";
import { EditEventModal } from "@/components/(adminDashboard)/modals/addEvent/EditEvent";
import { useDltEventMutation } from "@/redux/api/event.api";
import { toast } from "sonner";

interface EventCardProps {
  event: IEvent
}
export function EventDisplayCard({ event }: EventCardProps) {
  const [open, setOpen] = useState(false);
  const [handleDltevent] = useDltEventMutation();
  const [defaultData, setDefaultData] = useState<null | IEvent>(null);

  const handleDelete = async (id: string) => {
    try {
      await handleDltevent({ eventId: id }).unwrap();
      toast.success("Event deleted successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try agin")
    }
  }

  return (
    <>
      <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm p-2">
        <div className="relative h-[160px] w-full">
          <div>
            <Image
              src={event?.image?.url || "/placeholder.svg"}
              alt={"event image"}
              fill
              className="object-cover rounded"
            />

            <div className="absolute top-2 left-2 bg-white text-center p-2 rounded-md  ">
              <p className="text-[#8A8A8A] font-medium">
                {moment(event?.date).format("MMM")}
              </p>
              <p className="text-main-color font-semibold">
                {moment(event?.date).format("DD")}
              </p>
              <p className="text-[#8A8A8A] font-medium">
                {moment(event?.date).format("YYYY")}
              </p>
            </div>
          </div>
        </div>
        <CardContent className="p-2">
          <h3 className="font-semibold text-base text-gray-900 mb-1">{event?.name}</h3>
          <p className="text-sm text-gray-500 mb-3 flex items-center gap-x-1">
            <MapPin size={14} /> {event?.venue}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">

            <span
              className="px-3 py-1 text-xs font-medium text-white rounded-md bg-blue-500"
            >
              {event.type}
            </span>

            <span
              className={`px-3 py-1 text-xs font-medium text-white rounded-md ${moment(event?.date).diff(moment(), "days") < 0 ? "bg-red-500" : "bg-green-500"}`}
            >
              {`${moment(event?.date).diff(moment(), "days")} days`}
            </span>

            <span
              className="px-3 py-1 text-xs font-medium text-white rounded-md bg-yellow-400"
            >
              {`$ ${event?.registration_fee}`}
            </span>

          </div>

          <div className="flex gap-2">
            <Popconfirm
              title="Delete the event"
              description="Are you sure to delete this event?"
              onConfirm={()=>handleDelete(event?._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                variant="outline"
                size={"sm"}
                className="flex-1 text-sm font-medium border-main-color text-main-color hover:bg-gray-50 bg-transparent"
              >
                Delete
              </Button>
            </Popconfirm>

            <Button
              size={"sm"}
              className="flex-1 text-sm font-medium bg-main-color hover:bg-red-700 text-white"
              onClick={() => {
                setDefaultData(event)
                setOpen(true);
              }}>
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {defaultData && <EditEventModal defaultdata={defaultData} open={open} setOpen={setOpen} />}

    </>
  );
}
