"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { Button, DatePicker, Form, FormProps, Input, InputNumber, Modal, Select, Upload, UploadFile } from "antd";
import { toast } from "sonner";
import { useAddEventMutation, useUpdateEventMutation } from "@/redux/api/event.api";
import { CloudDownload, LoaderCircle } from "lucide-react";
import { IEvent } from "@/redux/types";
import { UploadFileStatus } from "antd/es/upload/interface";
import { RiCloseLargeLine } from "react-icons/ri";
import dayjs from "dayjs";

type FieldType = {
    image: UploadFile[],
    type: string,
    name: string,
    venue: string,
    state: string,
    city: string,
    date: Date,
    duration: string,
    registration_fee: number,
    event_website: string,
}

export const EditEventModal = ({ defaultdata, open, setOpen }: { defaultdata: IEvent, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    return (
        <Modal
            open={open}
            footer={null}
            centered={true}
            onCancel={() => setOpen(false)}
            closeIcon={false}
            // title="Add New Event"
            width={600}
        >

            <div className="flex justify-end mb-4">
                <div
                    className="w-10 h-10 bg-[#F6BEBF]  rounded-full flex justify-center items-center cursor-pointer"
                    onClick={() => setOpen(false)}
                >
                    <RiCloseLargeLine size={18} color="#E12728" className="" />
                </div>
            </div>

            <EditEvent defaultdata={defaultdata} />

        </Modal>
    )
}


function EditEvent({ defaultdata }: { defaultdata: IEvent }) {
    const [handleUpdateEvent, { isLoading }] = useUpdateEventMutation();
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

        try {

            const formdata = new FormData();

            const { image, ...more } = values

            formdata.append("data", JSON.stringify(more));

            const newUploadedImage = values.image?.filter(i => {
                if (!i?.url) {
                    return i
                }
            })

            newUploadedImage.forEach((file) => {
                if (file.originFileObj) {
                    formdata.append('image', file.originFileObj as File);
                }
            });

            await handleUpdateEvent({ body: formdata, id: defaultdata?._id }).unwrap();
            toast.success("Event updated successfully");

        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    };

    useEffect(() => {

        if (defaultdata) {

            const { image, ...more } = defaultdata;

            const formattedImages: UploadFile[] = [{
                uid: `1`,
                name: `image-${image?.key}.png`,
                status: 'done' as UploadFileStatus,
                url: image?.url,
            }]

            form.setFieldsValue({ ...more, image: formattedImages, date: dayjs(defaultdata.date) });
        }
    }, [defaultdata, form]);

    return (
        <Form
            name="basic"
            style={{ width: '100%' }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            layout="vertical">

            <Form.Item<FieldType>
                name="image"
                label="Event banner"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e?.fileList;
                }}
                rules={[{ required: true, message: "Event banner required" }]}
            >
                <Upload.Dragger
                    name="files"
                    maxCount={1}
                    beforeUpload={() => false} // prevents automatic upload
                    accept="image/*"
                    listType="picture"
                >
                    <p className="ant-upload-drag-icon mx-auto flex justify-center">
                        <CloudDownload size={40} />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Only image file excepted</p>
                </Upload.Dragger>
            </Form.Item>

            <Form.Item<FieldType> label="Event Type" name={"type"} rules={[{ required: true, message: "Event type required" }]}>
                <Select
                    size="large"
                    placeholder="Select event type"
                    className='!w-full'
                    options={["AGF", "IBJJF", "NAGA", "ADCC", "Local"]?.map(i => {
                        return { label: i, value: i }
                    })}
                />
            </Form.Item>

            <Form.Item<FieldType> label="Event Name" name={"name"} rules={[{ required: true, message: "Event name required" }]}>
                <Input size="large" placeholder="Enter event name" />
            </Form.Item>
            <Form.Item<FieldType> label="Venue Name" name={"venue"} rules={[{ required: true, message: "Event vanue required" }]}>
                <Input size="large" placeholder="Enter vanue name" />
            </Form.Item>

            <div className="w-full grid grid-cols-2 gap-x-5">
                <Form.Item<FieldType> label="State" name={"state"}
                // rules={[{ required: true, message: "State required" }]}
                >
                    <Input size="large" placeholder="Enter state" />
                </Form.Item>
                <Form.Item<FieldType> label="City" name={"city"}
                // rules={[{ required: true, message: "City required" }]}
                >
                    <Input size="large" placeholder="Enter city" />
                </Form.Item>
            </div>

            <Form.Item<FieldType> name="date" label={"Event date"} rules={[{ required: true, message: "Event date is required" }]}>
                <DatePicker className='!w-full' size="large" placeholder="Select devent date" />
            </Form.Item>

            <Form.Item<FieldType> label="Registration Fee" name={"registration_fee"} rules={[{ required: true, message: "registration fee required" }]}>
                <InputNumber className="w-full" size="large" placeholder="eg : 70" />
            </Form.Item>
            <Form.Item<FieldType> label="Event website" name={"event_website"} rules={[{ required: true, message: "event website required" }]}>
                <Input className="w-full" size="large" placeholder="https://xyz.com" />
            </Form.Item>

            <Button htmlType="submit" className='!mt-4' type="primary" size="large" block disabled={isLoading} icon={isLoading ? <LoaderCircle className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                Submit
            </Button>

        </Form>
    );
}