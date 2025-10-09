import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { CalendarDays, CirclePlus, GitPullRequestCreateArrow, UsersRound } from "lucide-react";
import { BiSupport } from "react-icons/bi";


export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "account-details",
    icon: <UsersRound size={18} />,
    label: <Link href={"/account-details"}>Account Details</Link>,
  },
  {
    key: "gym-request",
    icon: <GitPullRequestCreateArrow size={18} />,
    label: <Link href={"/gym-request"}>Gym Request</Link>,
  },
  {
    key: "add-gyms",
    icon: <CirclePlus size={18} />,
    label: <Link href={"/add-gyms"}>Add Gyms</Link>,
  },
  {
    key: "add-events",
    icon: <CalendarDays size={18} />,
    label: <Link href={"/add-events"}>Add Events</Link>,
  },
  {
    key: "contact-support",
    icon: <BiSupport size={18} />,
    label: <Link href={"/contact-support"}>Contact Support</Link>,
  },
  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/settings"}>Settings</Link>,
  },
  // {
  //   key: "logout",
  //   icon: <RiLogoutCircleLine size={18} />,
  //   label: <Link href={"/login"}>Logout</Link>,
  // },
];
