"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { message, Popconfirm, PopconfirmProps } from "antd";
import { useState } from "react";
import { placeHolderBlurImg } from "@/utils/config";
import { EditGym } from "@/components/(adminDashboard)/modals/AddGym/EditGym";
import { IGym } from "@/redux/types";
import { useDltGymMutation } from "@/redux/api/gym.api";
import { toast } from "sonner";

export function GymDisplayCard({ gym }: { gym: IGym }) {
  const [DltGymByApi] = useDltGymMutation();
  const [open, setOpen] = useState(false);
  const [defaultdata, setDefultdata] = useState<IGym | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await DltGymByApi({ gymId: id }).unwrap();
      toast.success("Gym deleted successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try agin")
    }
  }

  return (
    <>
      <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm p-2">
        
          <Image
            src={gym?.images[0]?.url || "/placeholder.svg"}
            alt={gym?.name}
            height={1000}
            width={2000}
            placeholder="blur"
            blurDataURL={placeHolderBlurImg}
            className="object-cover rounded h-48"
          />
    
        <CardContent className="py-2 px-0 ">
          <h3 className="font-semibold text-base text-gray-900 mb-1">{gym?.name}</h3>
          <p className="text-sm text-gray-500 mb-3 flex items-center gap-x-1">
            <MapPin size={14} /> {gym?.street}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {gym?.disciplines.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <Popconfirm
              title="Delete the gym"
              description="Are you sure to delete this gym?"
              onConfirm={() => handleDelete(gym?._id)}
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
                setDefultdata(gym)
                setOpen(true);

              }}
            >
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
      {defaultdata && <EditGym open={open} onOpenChange={setOpen} defaultdata={defaultdata} />}
    </>
  );
}
