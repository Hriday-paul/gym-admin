"use client";
import AddEventModal from "@/components/(adminDashboard)/modals/addEvent/AddEventModal";
import { Button, Modal } from "antd";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";

export default function HeaderAndAddButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-wrap justify-between gap-2">
        <h3 className="lg:text-3xl md:text-3xl text-lg text-[#333] font-medium">
          Event Listing
        </h3>
        <Button onClick={() => setOpen(true)} type="primary" size="large">
          <PlusCircle /> Add Event
        </Button>
      </div>

      <Modal
        open={open}
        footer={null}
        centered={true}
        onCancel={() => setOpen(false)}
        closeIcon={false}
        // title="Add New Event"
        width={600}
        >

        <div className="flex justify-end mb-4">
          <div
            className="w-10 h-10 bg-[#F6BEBF]  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#E12728" className="" />
          </div>
        </div>

        <AddEventModal />
      </Modal>


    </>
  );
}
