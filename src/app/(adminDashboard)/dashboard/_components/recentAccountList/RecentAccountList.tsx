"use client";
import {Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import UserDetails from "@/components/(adminDashboard)/modals/user/UserDetails";
import { IUser } from "@/redux/types";
import { useAllusersQuery } from "@/redux/api/users.api";
import Image from "next/image";
import moment from "moment";
import ErrorComponent from "@/components/shared/ErrorComponent";

const RecentAccountList = () => {
  const { isLoading, isFetching, data, isError } = useAllusersQuery({ limit: 10 })

  const columns: TableColumnsType<IUser> = [
    {
      title: "#SL",
      dataIndex: "serial",
      render: (_, __, indx) => indx + 1
    },
    {
      title: "Full Name",
      dataIndex: "first_name",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          <Image
            src={record?.image || "/empty-user.png"}
            alt="profile-picture"
            width={40}
            height={40}
            className="size-10 rounded-full"
          ></Image>
          <p>{text + " " + (record?.last_name ?? "")}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Phone number",
      dataIndex: "contact",
      render(value) {
        return (value && value != "") ? value : "N/A"
      },
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
    }
  ];

  if(isError){
    return <ErrorComponent />
  }

  return (
    <div className="bg-section-bg rounded-3xl">
      <h1 className="text-[#000000] text-xl font-normal py-3 px-2">
        Recent Joined Users
      </h1>
      <Table<IUser>
        columns={columns}
        dataSource={data?.data?.data}
        loading={isLoading || isFetching}
        pagination={false}
        rowKey={(record) => record?._id}
        scroll={{ x: "max-content" }}
      ></Table>
    </div>
  );
};

export default RecentAccountList;
