"use client";
import { useReplyContactsMutation } from "@/redux/api/contact.api";
import { Icontact } from "@/redux/types";
import { Button, Form, FormProps, Input, Modal } from "antd";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  data: Icontact
};

const ContactSupportModal = ({ open, setOpen, data }: TPropsType) => {
  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        maxWidth: "600px",
        width: "90%",
        borderRadius: "16px",
      }}
    >
      <div className="p-2">
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <div
            className="w-10 h-10 bg-[#F6BEBF]  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#E12728" className="" />
          </div>
        </div>

        {/* Name Field */}
        <div className="mb-3">
          <label className="block text-sm text-gray-500 mb-2">Name</label>
          <div className="text-base text-gray-900">{data?.name}</div>
        </div>

        {/* Email Address Field */}
        <div className="mb-3">
          <label className="block text-sm text-gray-500 mb-2">
            Email Address
          </label>
          <div className="text-base text-gray-900">{data?.email}</div>
        </div>

        {/* Message Section */}
        <div className="mb-2">
          <label className="block text-sm text-gray-500 mb-2">Message</label>
          <div className="text-base text-gray-900 leading-relaxed">
            {data?.description}
          </div>
        </div>

        {/* Add Reply Textarea */}
        <ReplyMsg contact={data} />

      </div>
    </Modal>
  );
};

export default ContactSupportModal;

type FieldType = {
  description: string,
}

const ReplyMsg = ({ contact }: { contact: Icontact }) => {
  const [handlereplyApi, { isLoading }] = useReplyContactsMutation();

  const [form] = Form.useForm<FieldType>();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await handlereplyApi({ id: contact?._id, body: { message: values?.description } }).unwrap();
      toast.success('Replied successfully');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong, try again');
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      description: contact?.reply_message || "",
    });
  }, [contact])

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      style={{ width: "465px" }}
    >

      <Form.Item<FieldType>
        name="description"
        // label="Reply Message"
        rules={[{ required: true, message: "Reply message required" }]}
      >
        <Input.TextArea size="large" rows={4} disabled={contact?.isReplied} placeholder="Write reply message" />
      </Form.Item>

      <Button disabled={isLoading || contact?.isReplied} type="primary" htmlType="submit" size="large" block icon={isLoading ? <LoaderCircle className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
        Submit
      </Button>

    </Form>
  )
}
