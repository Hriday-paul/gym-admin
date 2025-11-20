import { useDeleteNotificationMutation } from '@/redux/api/notification.api';
import { INotification } from '@/redux/types';
import { Bell, LoaderCircle, Trash2 } from 'lucide-react';
import moment from 'moment';
import React from 'react';
import { toast } from 'sonner';

const Notification = ({ notification }: { notification: INotification }) => {
    const [dltNotification, { isLoading }] = useDeleteNotificationMutation();

    const handleDelete = async (id: string) => {
        try {
            await dltNotification({ id }).unwrap();
            toast.success("Notification deleted successfully")
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    }

    return (
        <div className="flex items-center gap-x-4">
            <div className="bg-main-color size-10 flex justify-center items-center rounded-full cursor-pointer">
                <Bell color="white" />
            </div>
            <div
                className="bg-white border border-gray-400 rounded-lg p-3 flex-1"
            >
                <div className="flex justify-between gap-x-2 items-center">
                    <h5 className={`font-medium text-xl ${notification?.isRead ? "text-gray-700" : "text-black"}`}>
                        {notification?.title}
                    </h5>
                    <p>{moment(notification?.createdAt).fromNow()}</p>
                </div>
                <p className="text-gray-500">{notification?.message}</p>
            </div>
            {/* delete option */}
            <button onClick={() => handleDelete(notification?._id)} className="bg-[#D30000]/30 size-10 flex justify-center items-center rounded-full cursor-pointer">
                {isLoading ? <LoaderCircle size={16} className='text-white animate-spin' /> : <Trash2 color="#D30000"></Trash2>}
            </button>
        </div>
    );
};

export default Notification;