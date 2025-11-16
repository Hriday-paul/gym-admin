"use client";;
import { Input, message, Pagination, Popconfirm, PopconfirmProps, Table, TableColumnsType, TableProps, Tag, Tooltip } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Search } from "lucide-react";
import UserDetails from "@/components/(adminDashboard)/modals/user/UserDetails";
import { CgUnblock } from "react-icons/cg";
import { toast } from "sonner";
import { useAllusersQuery, useBlock_unblockMutation } from "@/redux/api/users.api";
import { IUser } from "@/redux/types";
import Image from "next/image";
import moment from "moment";
import { MdBlockFlipped } from "react-icons/md";

const AccountDetailsTable = () => {
  const [handleStatusUpdate] = useBlock_unblockMutation();
  const [page, setPage] = useState(1);
  const limit = 10
  const [searchText, setSearchText] = useState("");
  const query: { page: number, limit: number, searchTerm: string } = { page, limit, searchTerm: searchText };
  const { data, isLoading, isFetching } = useAllusersQuery(query);

  const [open, setOpen] = useState(false);
  const [accountDetails, setAccountDetails] = useState<null | IUser>(null);

  const columns: TableColumnsType<IUser> = [
    {
      title: "#SL",
      dataIndex: "serial",
      render: (_, __, indx) => indx + 1 + (page - 1) * limit
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
      title: "Status",
      dataIndex: "status",
      render(value) {
        return <Tag color={value ? "green" : "red"}>{value ? "Active" : "Blocked"}</Tag>
      },
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2 ">
          {/* <Link href={'/user/2'}>
            <Eye
              size={22}
              color="var(--color-text-color)"
            />
          </Link> */}

          <button onClick={() => {
            setAccountDetails(record)
            setOpen(true)
          }}>
            <Eye
              size={22}
              color="#78C0A8"
              onClick={() => setOpen(true)}
            />
          </button>

          <Popconfirm
            title="Block the user"
            description={`Are you sure to ${record?.status == 1 ? "block" : "unblock"} this user?`}
            onConfirm={() => handleBlockUser(record?._id, record?.status == 1 ? 0 : 1)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title={record?.status == 1 ? "Block" : "Unblock"}>
              <button>
                {record?.status == 0 ? <MdBlockFlipped size={22} color="green" /> : <CgUnblock size={22} color="#CD0335" />}
              </button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Block user handler
  const handleBlockUser = async (id: string, status: 1 | 0) => {
    try {
      if (status) {
        await handleStatusUpdate({ userId: id, status }).unwrap();
      } else {
        await handleStatusUpdate({ userId: id, status }).unwrap();
      }

      toast.success(`User ${status ? "unblock" : "block"} successfully`)

    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try again")
    }
  };

  return (
    <div className="bg-section-bg rounded-3xl">
      <div className="max-w-[400px] ml-auto mb-2 pt-2">
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search Users..."
          onChange={(e) => setSearchText(e?.target?.value)}
          prefix={<Search size={20} color="var(--color-main)"></Search>}
        ></Input>
      </div>
      <Table<IUser>
        columns={columns}
        dataSource={data?.data?.data}
        loading={isLoading || isFetching}
        pagination={false}
        rowKey={(record) => record?._id}
        footer={() =>
          <Pagination defaultCurrent={page} total={data?.data?.meta?.total} pageSize={limit} align="end" showSizeChanger={false} onChange={(page) => setPage(page)} />
        }
        scroll={{ x: "max-content" }}
      ></Table>
      {accountDetails && <UserDetails open={open} setOpen={setOpen} details={accountDetails}></UserDetails>}
    </div>
  );
};

export default AccountDetailsTable;
