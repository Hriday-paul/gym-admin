"use client";
import { Button, Input, Pagination, Table, TableColumnsType, Tag } from "antd";
import { useState } from "react"
import { Eye, Search } from "lucide-react";
import GymRequestModal from "@/components/(adminDashboard)/modals/GymRequestModal";
import { useAllClaimReqsQuery } from "@/redux/api/claimReq.api";
import ErrorComponent from "@/components/shared/ErrorComponent";
import { ICalimRes } from "@/redux/types";
import moment from "moment";

const GymRequestsTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10
  const [searchText, setSearchText] = useState("");
  const query: { page: number, limit: number, searchTerm: string } = { page, limit, searchTerm: searchText };
  const { isLoading, isError, data, isFetching } = useAllClaimReqsQuery(query)

  const [open, setOpen] = useState(false);
  const [gymDetails, setGymDetails] = useState<ICalimRes | null>(null);

  const columns: TableColumnsType<ICalimRes> = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => {
        return <p>{record?.user?.first_name + " " + (record?.user?.last_name ?? "")}</p>
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (value) => value ?? "N/A"
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      render: (value) => value ?? "N/A"
    },
    {
      title: "Status Type",
      dataIndex: "status",
      render(value) {
        return <Tag color={value == "approved" ? "green" : value == "rejected" ? "red" : "yellow"}>{value}</Tag>
      },
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      align: "center",
      render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" size="small" className="flex items-center gap-x-1" onClick={() => {
          setGymDetails(record)
          setOpen(true)
        }} >
          <Eye size={22} color="#ffff" />
        </Button>
      ),
    },
  ];

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <div className="bg-section-bg rounded-3xl">
      <div className="max-w-[400px] ml-auto mb-2 pt-2">
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search..."
          onChange={(e) => setSearchText(e?.target?.value)}
          prefix={<Search size={20} color="var(--color-main)"></Search>}
        ></Input>
      </div>
      <Table<ICalimRes>
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
      {gymDetails && <GymRequestModal open={open} setOpen={setOpen} data={gymDetails}></GymRequestModal>}
    </div>
  );
};

export default GymRequestsTable;
