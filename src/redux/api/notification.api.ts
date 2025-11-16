import { IBrand, IMeta, INotification } from "../types";
import baseApi from "./baseApi";

const NotificationApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

         notifications: builder.query<{ data: { data: INotification[], meta : IMeta } }, {}>({
            query: (query) => ({
                url: '/notifications',
                params: query
            }),
            providesTags: ["notification"]
        }),
        readNotification: builder.mutation<{ data: { data: INotification[] } }, { id: string }>({
            query: ({ id }) => ({
                url: `/notifications/make-read/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["notification"]
        }),
        readAllNotifications: builder.mutation<{ data: { data: INotification[] } }, void>({
            query: () => ({
                url: `/notifications/make-read-all`,
                method: "PUT"
            }),
            invalidatesTags: ["notification"]
        }),
       


    }),
});

export const {useNotificationsQuery, useReadNotificationMutation, useReadAllNotificationsMutation} = NotificationApi;