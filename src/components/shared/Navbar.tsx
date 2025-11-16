"use client";
import { Avatar, Badge, Flex, Popover } from "antd";
import { FaBars } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import avatarImg from "@/assets/image/user_image.png";

import Link from "next/link";
import { Bell, ChevronDown, ChevronRight, LogOut, User, X } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";
import { useGetUserProfileQuery } from "@/redux/api/auth.api";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUserDetails, logoutUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {

  const { data: res, isSuccess, isError } = useGetUserProfileQuery();
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(addUserDetails({ name: res?.data?.first_name, role: res?.data?.role, profilePicture: res?.data?.image || "/empty-user.png" }));
    }
    if (isError) {
      dispatch(logoutUser())
      router.push("/login")
    }
  }, [isError, router, isSuccess, res])

  const { user } = useSelector((state: RootState) => state.userSlice);

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push("/login")
  };

  return (
    <div className="flex items-center justify-between w-[97%] font-poppins">
      {/* Header left side */}
      <Flex align="center" gap={20}>
        <button
          onClick={() => setCollapsed(collapsed ? false : true)}
          className="cursor-pointer hover:bg-gray-300 rounded-full duration-1000"
        >
          {collapsed ? (
            <X size={28} color="#3A3C3B" />
          ) : (
            <FaBars size={28} color="#3A3C3B" />
          )}
        </button>
        <div className="flex flex-col ">
          <h2 className="md:text-2xl text-lg  font-medium text-[#3A3C3B]">
            Welcome, {user?.name}
            <span className="block  text-sm font-normal">Have a nice day!</span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align="center" gap={20}>

        {/* Notification */}
        <Link href={"/notifications"}>
          <div className="flex justify-center bg-[#eceef1] items-center size-12 rounded-full cursor-pointer relative">
            {/* <IoNotificationsOutline size={24} color="#3A3C3B" /> */}
            <Bell size={24} color="#545454" />

            <Badge
              count={0}
              style={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "var(--color-main)",
                color: "#fff",
                position: "absolute",
                top: "-24px",
                right: "-8px",
              }}
            ></Badge>
          </div>
        </Link>

        <Popover arrow={false} placement="topRight" content={<div className="w-40">

          <Link href={'/personal-information'} className="w-full flex items-center px-3 py-2 mt-1 text-sm font-medium hover:bg-slate-50 duration-200" >
            <User size={20} />
            <span className={`ml-3 transition-opacity duration-200`}>
              Profile
            </span>
          </Link>

          <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 mt-1 text-sm font-medium hover:bg-slate-50 duration-200" >
            <LogOut size={20} />
            <span className={`ml-3 transition-opacity duration-200 text-red-500`}>
              Logout
            </span>
          </button>

        </div>} trigger={"click"}>


          <div className="p-1 border border-stroke rounded-full flex flex-row gap-x-3 items-center cursor-pointer">
            <ChevronDown size={20} className="text-text-color ml-2" />
            <h2 className="text-black text-base font-medium">{user?.name}</h2>
            <Avatar
              src={user?.profilePicture}
              size={40}
              className="border border-main-color size-12"
            ></Avatar>
          </div>

        </Popover>

      </Flex>
    </div>
  );
};

export default Navbar;
