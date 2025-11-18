"use client";
import { Button, Input, Pagination, Table, TableColumnsType, Tag } from "antd";
import { useState } from "react";
import { Eye, Search } from "lucide-react";
import ContactSupportModal from "@/components/(adminDashboard)/modals/contactSupport/ContactSupportModal";
import { useAllContactsQuery } from "@/redux/api/contact.api";
import { Icontact } from "@/redux/types";
import moment from "moment";


const ContactSupportTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10
  const [searchText, setSearchText] = useState("");
  const query: { page: number, limit: number, searchTerm: string } = { page, limit, searchTerm: searchText };
  const { data, isLoading, isFetching } = useAllContactsQuery(query);

  const [open, setOpen] = useState(false);
  const [contactData, setContactData] = useState<Icontact | null>(null)

  const columns: TableColumnsType<Icontact> = [
    {
      title: "#SL",
      dataIndex: "serial",
      render: (_, __, indx) => indx + 1 + (page - 1) * limit
    },
    {
      title: "Name",
      dataIndex: "name",
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
      dataIndex: "isReplied",
      render(value) {
        return <Tag color={value ? "green" : "yellow"}>{value ? "Replied" : "Not Replied"}</Tag>
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
          <Button size='small' onClick={() => {
            setContactData(record)
            setOpen(true)
          }}>
            <Eye
              size={18}
              color="var(--color-text-color)"
            />
          </Button>
        </div>
      ),
    },
  ];

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
      <Table<Icontact>
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
     {contactData && <ContactSupportModal open={open} setOpen={setOpen} data={contactData}></ContactSupportModal>}
    </div>
  );
};

export default ContactSupportTable;
