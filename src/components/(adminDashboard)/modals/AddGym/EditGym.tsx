"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { Button, Form, FormProps, Input, InputNumber, Modal, Select, Upload, UploadFile } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { config, timeSlotOptions } from "@/utils/config";
import { CloudDownload, LoaderCircle } from "lucide-react";
import { LoadScriptNext } from "@react-google-maps/api"
import SelectMap from "./SelectMap";
import SelectAddress from "./SelectAddress";
import { useDltGymImageMutation, useUpdateGymMutation } from "@/redux/api/gym.api";
import { toast } from "sonner";
import { IGym } from "@/redux/types";
import { UploadFileStatus } from "antd/es/upload/interface";

const GOOGLE_MAPS_API_KEY = config.MAP_KEY!

interface AddGymModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultdata: IGym
}

type FieldType = {
    images: UploadFile[],
    name: string,
    description: string,
    address: string,
    street: string,
    state: string,
    city: string,
    zip_code: string,
    phone: string,
    email: string,
    website: string,
    facebook: string,
    instagram: string,
    mat_schedules: { day: string, from: number, from_view: string, to: number, to_view: string }[],
    class_schedules: { name: string, day: string, from: number, from_view: string, to: number, to_view: string }[],
    disciplines: string[],
}

export function EditGym({
    open,
    onOpenChange,
    defaultdata
}: AddGymModalProps) {

    const [handleUpdateGym, { isLoading }] = useUpdateGymMutation();
    const [handleDltGymImg] = useDltGymImageMutation();

    const [form] = Form.useForm();

    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [pickupInputValue, setPickupInputValue] = useState<string>("");
    // const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        if (!selectedLocation) {
            toast.error("Choose your gym location")
            return;
        }

        try {

            const formdata = new FormData();

            const { images, address, ...morefields } = values;

            const location = selectedLocation ? selectedLocation :
                { latitude: defaultdata?.location?.coordinates[1], longitude: defaultdata?.location?.coordinates[0] };

            formdata.append("data", JSON.stringify({
                ...morefields,
                street: address,
                location: { type: "Point", coordinates: [location.longitude, selectedLocation?.latitude] },
            }));

            const newUploadedImage = values.images?.filter(i => {
                if (!i?.url) {
                    return i
                }
            })

            newUploadedImage.forEach((file) => {
                if (file.originFileObj) {
                    formdata.append('images', file.originFileObj as File);
                }
            });

            await handleUpdateGym({ body: formdata, id: defaultdata?._id }).unwrap();
            toast.success("Gym updated successfully");
            form.resetFields();

        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    };


    useEffect(() => {
        if (defaultdata?.images) {
            const formattedImages: UploadFile[] = defaultdata.images.map((url, index) => ({
                uid: url?._id,
                name: `image-${index}.png`,
                status: 'done' as UploadFileStatus,
                url: url?.url,
            }));

            // setFileList(formattedImages);

            form.setFieldsValue({ ...defaultdata, images: formattedImages, address: defaultdata?.street });
            setSelectedLocation({ longitude: defaultdata?.location?.coordinates[0], latitude: defaultdata?.location?.coordinates[1] })
        }
    }, [defaultdata, form]);


    useEffect(() => {
        if (pickupInputValue && pickupInputValue !== "") {
            form.setFieldsValue({ address: pickupInputValue })
        }
    }, [pickupInputValue, form]);

    const handleImageDlt = async (file: UploadFile) => {

        if (file?.originFileObj) {
            return true;
        }

        if (file?.uid) {
            const loader = toast.loading("Loading...")
            try {
                await handleDltGymImg({ gymId: defaultdata?._id, imageId: file?.uid }).unwrap();
                toast.success("Image deleted successfully")
            } catch (err: any) {
                toast.error(err?.data?.message || "Something went wrong, try again")
                return false;
            } finally {
                toast.dismiss(loader)
            }
        }
        // setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
    }

    return (
        <Modal
            open={open}
            footer={null}
            centered={true}
            onCancel={() => onOpenChange(false)}
            closeIcon={false}
            width={800}
        // style={{
        //   maxWidth: "700px",
        //   width: "100%",
        //   borderRadius: "12px",
        // }}
        >

            {/* Close button */}
            <div className="flex justify-end mb-4">
                <div
                    className="w-10 h-10 bg-[#F6BEBF]  rounded-full flex justify-center items-center cursor-pointer"
                    onClick={() => onOpenChange(false)}
                >
                    <RiCloseLargeLine size={18} color="#E12728" className="" />
                </div>
            </div>

            <h4 className="text-2xl font-semibold mb-5">
                Edit Gym
            </h4>


            <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>

                <Form
                    name="basic"
                    style={{ width: '100%' }}
                    initialValues={{ class_schedules: [{}], mat_schedules: [{}] }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                    layout="vertical">

                    <Form.Item<FieldType>
                        name="images"
                        label="Images"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e?.fileList;
                        }}
                        rules={[{ required: true, message: "Minimum 1 image is required" }]}
                    >
                        <Upload
                            name="files"
                            // maxCount={1}
                            beforeUpload={() => false} // prevents automatic upload
                            accept="image/*"
                            listType="picture-card"
                            multiple
                            // fileList={fileList}
                            // onChange={({ fileList }) => setFileList(fileList)}
                            onPreview={() => { }}
                            showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: true,
                            }}
                            onRemove={handleImageDlt}
                        >
                            <p className="ant-upload-drag-icon mx-auto flex justify-center">
                                <CloudDownload size={30} />
                            </p>
                        </Upload>
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                        {/* lest side */}
                        <div>
                            <div>
                                <h3 className="text-base font-semibold mb-3">Basic Information</h3>
                                <Form.Item<FieldType> name="name" label={"Gym Name"} rules={[{ required: true, message: "gym name is required" }]}>
                                    <Input size="large" placeholder="Enter Gym name" />
                                </Form.Item>

                                <Form.Item<FieldType> name="description" label={"Description"} rules={[{ required: true, message: "Description is required" }]}>
                                    <Input.TextArea rows={4} size="large" placeholder="Enter gym Description" />
                                </Form.Item>
                            </div>

                            <div>
                                <h3 className="text-base font-semibold mb-3">Location</h3>
                                {/* <Form.Item<FieldType> name="address" label={"Address"} rules={[{ required: true, message: "address is required" }]}>
                  <Input size="large" placeholder="Enter address" />
                </Form.Item> */}

                                <SelectAddress pickupInputValue={pickupInputValue} selectedLocation={selectedLocation} setPickupInputValue={setPickupInputValue} setSelectedLocation={setSelectedLocation} />

                                <div className="grid grid-cols-2 gap-x-5">
                                    <Form.Item<FieldType> name="state" label={"State"} rules={[{ required: true, message: "state is required" }]}>
                                        <Input size="large" placeholder="Enter State" />
                                    </Form.Item>
                                    <Form.Item<FieldType> name="city" label={"City"} rules={[{ required: true, message: "city is required" }]}>
                                        <Input size="large" placeholder="Enter city" />
                                    </Form.Item>
                                </div>
                                <Form.Item<FieldType> name="zip_code" label={"Zip Code"} rules={[{ required: true, message: "zip code is required" }]}>
                                    <Input size="large" placeholder="Enter zip code" />
                                </Form.Item>
                            </div>

                            <div>
                                <h3 className="text-base font-semibold mb-3">Open Mat Schedule</h3>
                                <Form.List
                                    name="mat_schedules"
                                    rules={[]}
                                >

                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field) => (
                                                <Form.Item
                                                    // label={index === 0 ? 'Days Off' : ''}
                                                    required={false}
                                                    noStyle
                                                    key={`mat_schedules-${field.key}`}
                                                >
                                                    <div className="flex flex-row gap-x-5">
                                                        <div className="w-full">
                                                            <Form.Item
                                                                name={[field.name, "day"]}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[{ required: true, message: "Plsease, select day" }]}
                                                                label="Day"
                                                            >
                                                                <Select
                                                                    size="large"
                                                                    placeholder="Select day"
                                                                    className='!w-full'
                                                                    options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]?.map(i => {
                                                                        return { label: i, value: i }
                                                                    })}
                                                                />
                                                            </Form.Item>

                                                            <div className="grid grid-cols-2 gap-x-3">
                                                                <Form.Item
                                                                    name={[field.name, "from"]}
                                                                    validateTrigger={["onChange", "onBlur"]}
                                                                    rules={[{ required: true, message: "Plsease, select time" }]}
                                                                    label="From"
                                                                >
                                                                    <Select
                                                                        size="large"
                                                                        placeholder="Select open time"
                                                                        className='!w-full'
                                                                        options={timeSlotOptions?.map(i => {
                                                                            return { label: i?.label, value: i?.value }
                                                                        })}
                                                                    />
                                                                </Form.Item>

                                                                <Form.Item
                                                                    name={[field.name, "to"]}
                                                                    validateTrigger={["onChange", "onBlur"]}
                                                                    rules={[{ required: true, message: "Plsease, select time" }]}
                                                                    label="To"
                                                                >
                                                                    <Select
                                                                        size="large"
                                                                        placeholder="Select close time"
                                                                        className='!w-full'
                                                                        options={timeSlotOptions?.map(i => {
                                                                            return { label: i?.label, value: i?.value }
                                                                        })}
                                                                    />
                                                                </Form.Item>
                                                            </div>
                                                        </div>

                                                        <Button
                                                            type="primary"
                                                            onClick={() => remove(field.name)}
                                                            icon={<MdDeleteOutline className="dynamic-delete-button !text-danger" />}
                                                            size="middle"
                                                        >
                                                        </Button>


                                                        {/* Add button only beside the first input */}

                                                    </div>
                                                </Form.Item>
                                            ))}
                                            <Button
                                                type="dashed"
                                                block
                                                onClick={() => add()}
                                                icon={<FaPlus />}
                                                iconPosition="start"
                                                size="middle"
                                            >
                                                Add More Days
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </>
                                    )}
                                </Form.List>
                            </div>

                        </div>

                        {/* right side */}
                        <div>
                            <div>
                                <h3 className="text-base font-semibold mb-3">Contact Information</h3>
                                <Form.Item<FieldType> name="phone" label={"Phone Number"} rules={[{ required: true, message: "phone number is required" }]}>
                                    <InputNumber size="large" placeholder="Enter phone number" className="w-full" />
                                </Form.Item>
                                <Form.Item<FieldType> name="email" label={"Email Number"} rules={[{ required: true, message: "email is required" }]}>
                                    <Input size="large" type="email" placeholder="Enter email" />
                                </Form.Item>
                                <Form.Item<FieldType> name="website" label={"Website"} rules={[]}>
                                    <Input size="large" placeholder="http://xyz.com" />
                                </Form.Item>
                                <Form.Item<FieldType> name="facebook" label={"Facebook"} rules={[]}>
                                    <Input size="large" placeholder="http://facebook.com" />
                                </Form.Item>
                                <Form.Item<FieldType> name="instagram" label={"Instagram"} rules={[]}>
                                    <Input size="large" placeholder="http://instagram.com" />
                                </Form.Item>
                            </div>

                            <div>
                                <h3 className="text-base font-semibold mb-3">Class Schedule</h3>
                                <Form.List
                                    name="class_schedules"
                                    rules={[]}
                                >

                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field) => (
                                                <Form.Item
                                                    // label={index === 0 ? 'Days Off' : ''}
                                                    required={false}
                                                    noStyle
                                                    key={`class_schedules-${field.key}`}
                                                >
                                                    <div className="flex flex-row gap-x-5">
                                                        <div className="w-full">

                                                            <Form.Item
                                                                name={[field.name, "name"]}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[{ required: true, message: "Plsease, enter class name" }]}
                                                                label="Class Name"

                                                            >
                                                                <Input size="large" placeholder="Enter the class name" />
                                                            </Form.Item>

                                                            <Form.Item
                                                                name={[field.name, "day"]}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[{ required: true, message: "Plsease, select day" }]}
                                                                label="Day"
                                                            >
                                                                <Select
                                                                    size="large"
                                                                    placeholder="Select day"
                                                                    className='!w-full'
                                                                    options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]?.map(i => {
                                                                        return { label: i, value: i }
                                                                    })}
                                                                />
                                                            </Form.Item>

                                                            <div className="grid grid-cols-2 gap-x-3">
                                                                <Form.Item
                                                                    name={[field.name, "from"]}
                                                                    validateTrigger={["onChange", "onBlur"]}
                                                                    rules={[{ required: true, message: "Plsease, select time" }]}

                                                                    label="From"
                                                                >
                                                                    <Select
                                                                        size="large"
                                                                        placeholder="Select open time"
                                                                        className='!w-full'
                                                                        options={timeSlotOptions?.map(i => {
                                                                            return { label: i?.label, value: i?.value }
                                                                        })}
                                                                    />
                                                                </Form.Item>

                                                                <Form.Item
                                                                    name={[field.name, "to"]}
                                                                    validateTrigger={["onChange", "onBlur"]}
                                                                    rules={[{ required: true, message: "Plsease, select time" }]}
                                                                    label="To"
                                                                >
                                                                    <Select
                                                                        size="large"
                                                                        placeholder="Select close time"
                                                                        className='!w-full'
                                                                        options={timeSlotOptions?.map(i => {
                                                                            return { label: i?.label, value: i?.value }
                                                                        })}
                                                                    />
                                                                </Form.Item>
                                                            </div>
                                                        </div>

                                                        <Button
                                                            type="primary"
                                                            onClick={() => remove(field.name)}
                                                            icon={<MdDeleteOutline className="dynamic-delete-button !text-danger" />}
                                                            size="middle"
                                                        >
                                                        </Button>


                                                        {/* Add button only beside the first input */}

                                                    </div>
                                                </Form.Item>
                                            ))}
                                            <Button
                                                type="dashed"
                                                block
                                                onClick={() => add()}
                                                icon={<FaPlus />}
                                                iconPosition="start"
                                                size="middle"
                                            >
                                                Add More Classes
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </>
                                    )}
                                </Form.List>
                            </div>

                        </div>

                        <div>
                            <Form.Item<FieldType> label="Disciplines" name="disciplines" rules={[{ required: true, message: "Select minimum 1 discipline" }]}>
                                <Select
                                    size="large"
                                    placeholder="Select disciplins"
                                    className='!w-full'
                                    mode="multiple"
                                    options={["Jiu Jitsu", "Wrestling", "Judo", "MMA", "Boxing", "Muay Thai", "Kickboxing"]?.map(i => {
                                        return { label: i, value: i }
                                    })}
                                />
                            </Form.Item>
                        </div>

                    </div>

                    <SelectMap selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />

                    <Button htmlType="submit" className='!mt-4' type="primary" size="large" block disabled={isLoading} icon={isLoading ? <LoaderCircle className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                        Submit
                    </Button>

                </Form>

            </LoadScriptNext>

        </Modal>
    );
}


