"use client";
import { Button } from "@/components/ui/button";
import { useApproveClaimReqsMutation, useRejectClaimReqsMutation } from "@/redux/api/claimReq.api";
import { ICalimRes } from "@/redux/types";
import { Empty, Modal } from "antd";
import { X, User, FileText, Download, LoaderCircle } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  data: ICalimRes
};

const GymRequestModal = ({
  open,
  setOpen,
  data
}: TPropsType) => {
  const [handleApprove, { isLoading: approveLoad }] = useApproveClaimReqsMutation();
  const [handleReject, { isLoading: rejectLoad }] = useRejectClaimReqsMutation();

  const documents: { id: number, key: "utility_bill" | "business_license" | "tax_document", name: string }[] = [
    {
      id: 1,
      name: "Utility Bill",
      key: "utility_bill"
    },
    {
      id: 2,
      name: "Business License",
      key: "business_license"
    },
    {
      id: 3,
      name: "Tax Document",
      key: "tax_document"
    },
  ];

  const HandleApproveClaim = async (claimId: string) => {
    try {
      await handleApprove({ claimid: claimId }).unwrap();
      toast.success("Claim request approved successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again")
    }
  }
  const HandleRejectClaim = async (claimId: string) => {
    try {
      await handleReject({ claimid: claimId }).unwrap();
      toast.success("Claim request rejected successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again")
    }
  }

  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        maxWidth: "480px",
        width: "90%",
        borderRadius: "12px",
      }}
    >
      <div>
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <div
            className="w-10 h-10 bg-[#F6BEBF]  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#E12728" className="" />
          </div>
        </div>

        {!data?.gym && <div className="space-y-8">
          <p className="text-white text-center bg-red-500 px-3 py-1.5 rounded">Requested Gym Deleted</p>
          <Empty />
        </div>}

        {data?.gym && <>

          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Gym Claim Request Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Review the gym claim request and verify the claimant's information
                and documents.
              </p>
            </div>
          </div>

          {/* Claimant Information Section */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4 mt-6">
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-blue-600" />
              <h3 className="text-sm font-medium text-gray-900">
                Claimant Information
              </h3>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-sm font-semibold text-gray-900">
                  Gym Name :{" "}
                </span>
                <span className="text-sm text-gray-700">
                  {data.gym?.name || "N/A"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    Full Name:{" "}
                  </span>
                  <span className="text-sm text-gray-700">
                    {data?.user?.first_name + " " + data?.user?.last_name}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    State:{" "}
                  </span>
                  <span className="text-sm text-gray-700">
                    {data?.gym?.state || "N/A"}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    Email:{" "}
                  </span>
                  <span className="text-sm text-gray-700">
                    {data?.email || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    City:{" "}
                  </span>
                  <span className="text-sm text-gray-700">
                    {data?.gym?.city || "N/A"}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    Phone:{" "}
                  </span>
                  <span className="text-sm text-gray-700">
                    {data?.phone || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    Claim Date:{" "}
                  </span>
                  <span className="text-sm text-gray-700">
                    {moment(data?.createdAt).format("MMMM Do YYYY, h:mm a")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Required Documents Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-gray-600" />
              <h3 className="text-sm font-medium text-gray-900">
                Required Documents
              </h3>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <FileText size={20} className="text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {doc.name}
                      </p>
                      {/* <p className="text-xs text-gray-500">{doc.filename}</p> */}
                      <p className="text-xs text-gray-400 mt-0.5">
                        Uploaded: {moment(data?.createdAt).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${data?.status == "pending" ? "text-yellow-700 bg-yellow-50" : data?.status == "approved" ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${data?.status == "pending" ? "bg-yellow-500" : data?.status == "approved" ? "bg-green-500" : "bg-red-500"}`}></span>
                      {data?.status == "pending" ? "Pending" : data?.status == "rejected" ? "Rejected" : "Approved"}
                    </span>
                    <Link
                      download
                      href={data[doc?.key]?.url}
                      target="_blank"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Download size={14} />
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {data?.status == "pending" && <div className="flex gap-3">
            <Button
              size={"sm"}
              disabled={approveLoad}
              className="flex-1 bg-[#00A63E] hover:bg-green-700 text-white font-medium py-5 rounded-lg transition-colors flex flex-row gap-x-1.5 disabled:cursor-not-allowed"
              onClick={() =>
                HandleApproveClaim(data?._id)
              }
            >
              {approveLoad ? <LoaderCircle className="animate-spin size-5 text-white" /> : "✓ "}
              Approve Claim
            </Button>
            <Button
              size={"sm"}
              disabled={rejectLoad}
              className="flex-1 bg-[#D4183D] hover:bg-red-700 text-white font-medium py-5 rounded-lg transition-colors flex flex-row gap-x-1.5 disabled:cursor-not-allowed"
              onClick={() =>
                HandleRejectClaim(data?._id)
              }
            >
              {rejectLoad ? <LoaderCircle className="animate-spin size-5 text-white" /> : " ✕ "}
              Reject Claim
            </Button>
          </div>}
        </>}

      </div>
    </Modal>
  );
};

export default GymRequestModal;
