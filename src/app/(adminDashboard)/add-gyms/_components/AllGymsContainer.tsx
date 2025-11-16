"use client"
import { GymDisplayCard } from "./GymDisplayCard";
import { useAllGymsQuery } from "@/redux/api/gym.api";
import { useState } from "react";
import ErrorComponent from "@/components/shared/ErrorComponent";
import { Empty, Input, Pagination, Spin } from "antd";
import { Search } from "lucide-react";

export default function AllGymsContainer() {
  const [page, setPage] = useState(1);
  const limit = 10
  const [searchText, setSearchText] = useState("");
  const query: { page: number, limit: number, searchTerm: string } = { page, limit, searchTerm: searchText };
  const { isLoading, isError, data, isSuccess, isFetching } = useAllGymsQuery(query);

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <Spin spinning={isLoading || isFetching}>

      <div className="max-w-[400px] ml-auto mb-2 pt-2">
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search..."
          onChange={(e) => setSearchText(e?.target?.value)}
          prefix={<Search size={20} color="var(--color-main)"></Search>}
        ></Input>
      </div>

      {(isSuccess && data?.data?.data?.length > 0) && <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 border border-gray-300 lg:p-6 p-2 rounded-2xl bg-[#F9F9FA] mb-5">
          {data?.data?.data?.map((gym) => (
            <GymDisplayCard
              key={gym?._id}
              name={gym?.name}
              address={`${gym?.street}, ${gym?.city}`}
              images={gym?.images}
              tags={[]}
            />
          ))}
        </div>

        <Pagination defaultCurrent={page} total={data?.data?.meta?.total} pageSize={limit} align="end" showSizeChanger={false} onChange={(page) => setPage(page)} />

      </>}

      {
        (isSuccess && data?.data?.data?.length == 0) && <Empty />
      }

    </Spin>
  );
}
