"use client";
import { Button, Form, FormProps, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { toast } from "sonner";
import { Camera, LoaderCircle, Trash2, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetUserProfileQuery, useUpdateProfileMutation } from "@/redux/api/auth.api";
import { ImSpinner3 } from "react-icons/im";

type FieldType = {
  name: string,
  email: string,
  contact: string,
  location?: string,
  webLink?: string,
}

const PersonalInformationContainer = () => {
  const { data, isSuccess, isLoading } = useGetUserProfileQuery();
  const [updateProfile, { isLoading: updateLoading }] = useUpdateProfileMutation();
  const route = useRouter();
  const { user } = useSelector((root: RootState) => root?.userSlice)
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const form = new FormData();
      form.append('data', JSON.stringify({ first_name: values?.name, last_name: "", contact: values?.contact}))

      if (file) {
        form.append("image", file)
      }

      await updateProfile({ data: form }).unwrap();

      toast.success("Profile update successfully.")
      setFile(null);
      setEdit(false)

    } catch (error) {
      toast.error("Profile update failed, try again")
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    const file = input.files?.[0];

    if (file) {
      setFile(file)
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span
            onClick={() => route.back()}
            className="cursor-pointer bg-main-color p-2 rounded-full"
          >
            <FaArrowLeft size={20} color="#fff" />
          </span>
          <h4 className="text-2xl font-medium text-text-color">
            Personal Information
          </h4>
        </div>
        <div className={edit ? "hidden" : ""}>
          <Button

            onClick={() => setEdit(true)}
            size="large"
            icon={<FiEdit />}
          >
            Edit Profile
          </Button>
        </div>
      </div>
      <hr className="my-4" />


      {/* personal information */}

      {isLoading ? <div className='min-h-40 flex items-center justify-center'>
        <LoaderCircle size={50} className="text-4xl text-main-color animate-spin" />
      </div>

        : isSuccess ?

          <div className="mt-10 flex justify-center flex-col xl:flex-row items-start  gap-10">

            <div className="bg-[#824902]/10 border border-main-color h-[365px] md:w-[350px] rounded-xl shadow-sm flex justify-center items-center text-text-color">
              <div className="space-y-2 relative">
                <div className="relative group">
                  <Image
                    src={file ? URL.createObjectURL(file) : data?.data?.image || "/empty-user.png"}
                    alt="adminProfile"
                    width={1200}
                    height={1200}
                    className="size-36 rounded-full flex justify-center items-center object-cover"
                  ></Image>

                  {/* cancel button */}
                  {file && (
                    <div
                      className="absolute left-4 top-2 cursor-pointer rounded-md bg-primary-pink opacity-0 duration-1000 group-hover:opacity-100"
                      onClick={() => {
                        setFile(null)
                      }}
                    >
                      <Trash2 size={20} color="red" />
                    </div>
                  )}

                  {/* upload image */}
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {/* upload button */}
                  <label
                    htmlFor="fileInput"
                    className="flex cursor-pointer flex-col items-center"
                  >
                    <div className="bg-white text-black text-lg p-1 rounded-full  absolute bottom-0 right-3">
                      <Camera size={20} />
                    </div>
                  </label>
                </div>
                <h3 className="text-xl text-center">{user?.role}</h3>
              </div>
            </div>

            {/* form */}
            <div className="w-2/4">
              <Form
                onFinish={onFinish}
                layout="vertical"
                style={{
                  marginTop: "25px",
                }}
                initialValues={{
                  name: data?.data?.first_name,
                  email: data?.data?.email,
                  contact: data?.data?.contact,
                  location: data?.data?.location
                }}
              >
                {/*  input  name */}
                <Form.Item<FieldType> label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
                  <Input
                    size="large"
                    placeholder="Enter full name "
                    readOnly={!edit}
                  ></Input>
                </Form.Item>

                {/*  input  email */}
                <Form.Item<FieldType> label="Email" name="email" rules={[{ required: true, message: "Email name is required" }]}>
                  <Input
                    size="large"
                    placeholder="Enter email"
                    readOnly
                    disabled
                  ></Input>
                </Form.Item>

                {/* input  phone number  */}
                <Form.Item<FieldType> label="Phone Number" name="contact"
                // rules={[{ required: true, message: "Contact is required" }]}
                >
                  <Input
                    size="large"
                    placeholder="Enter Phone number"
                    readOnly={!edit}
                  ></Input>
                </Form.Item>

                <div className={edit ? "" : "hidden"}>
                  <Button
                    htmlType="submit"
                    size="large"
                    type="primary"
                    block
                    disabled={updateLoading} icon={updateLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                    Save Change
                  </Button>
                </div>
              </Form>
            </div>
          </div> : <></>}


    </div>
  );
};

export default PersonalInformationContainer;
