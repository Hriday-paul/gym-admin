import { IUser } from "@/redux/types";
import { Avatar, Modal } from "antd";
import moment from "moment";
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  details: IUser
};

const UserDetails = ({ open, setOpen, details }: TPropsType) => {
  console.log(details)
  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
      }}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center  ">
          <div></div>
          <div
            className="w-10 h-10 bg-[#F6BEBF]  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#E12728" className="" />
          </div>
        </div>

        {/* --------------------- user details information ---------------------------- */}
        <Image
          src={details?.image || "/empty-user.png"}
          alt="profile-picture"
          width={1000}
          height={1000}
          className="h-32 w-32 object-cover mx-auto rounded-full"
        ></Image>

        <div className="mt-10">
          <div className="flex justify-between bg-[#ECF2F0]  py-3 px-2">
            <h4>Full name :</h4>
            <p className="font-medium">{details?.first_name + " " + details?.last_name}</p>
          </div>
          <div className="flex justify-between   py-3 px-2">
            <h4>Email :</h4>
            <p className="font-medium">{details?.email}</p>
          </div>
          <div className="flex justify-between bg-[#ECF2F0]  py-3 px-2">
            <h4>Contact Number :</h4>
            <p className="font-medium">{details?.contact || "N/A"}</p>
          </div>
          <div className="flex justify-between   py-3 px-2">
            <h4>Location :</h4>
            <p className="font-medium">{"N/A"}</p>
          </div>
          <div className="flex justify-between  py-3 px-2">
            <h4>Date of Join :</h4>
            <p className="font-medium">{moment(details?.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
