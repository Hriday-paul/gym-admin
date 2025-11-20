"use client";

import { useGetTermsContentsQuery, useUpdateTermsContentMutation } from "@/redux/api/content.api";
import { Button } from "antd";
import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { ImSpinner3 } from "react-icons/im";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TermsConditionsEditor = () => {
  const [updateFn, { isLoading: updateLoading }] = useUpdateTermsContentMutation();
  const { data: termsRes, isLoading: getLoading, isSuccess } = useGetTermsContentsQuery();

  const route = useRouter();
  const [value, setValue] = useState("");

  const toolbarOptions = [
    ["image"],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ];

  const onSubmit = async () => {
    try {
      const res = await updateFn(value).unwrap();
      toast.success("Terms update done.")
    } catch (error) {
      toast.error("Terms update failed, try again")
    }
  }

  const moduleConest = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    if (termsRes) {
      setValue(termsRes?.data?.value)
    }
  }, [termsRes])

  return (
    <>
      <div className="flex items-center gap-2">
        <span
          onClick={() => route.back()}
          className="cursor-pointer bg-main-color p-2 rounded-full"
        >
          <FaArrowLeft size={20} color="#fff" />
        </span>
        <h4 className="text-2xl font-medium text-text-color">Terms & Condition</h4>
      </div>
      {getLoading ? <div className='min-h-40 flex items-center justify-center'>
        <LoaderCircle size={50} className="text-4xl text-main-color animate-spin" />
      </div> : isSuccess ?
        <>
          <ReactQuill
            modules={moduleConest}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Start writing ......"
            style={{
              border: "1px solid #EFE8FD",
              marginTop: "20px",
              borderRadius: "10px",
            }}
          />
          <Button
          onClick={onSubmit}
            size="large"
            block
            style={{
              marginTop: "20px",
            }}
            disabled={updateLoading} icon={updateLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end"
            type="primary"
          >
            Save Changes
          </Button>
        </> : <></>
      }
    </>
  );
};

export default dynamic(() => Promise.resolve(TermsConditionsEditor), {
  ssr: false,
});
