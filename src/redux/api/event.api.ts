import { IBrand, ICalimRes, IEvent, IGym, IMeta } from "../types";
import baseApi from "./baseApi";

const EventApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({


        allEventss: builder.query<
            { message: string, data: { data: IEvent[], meta: IMeta } },
            {}
        >({
            query: (query) => ({
                url: "/events",
                params: query
            }),
            providesTags: ["event"],
        }),

        addEvent: builder.mutation<
            { message: string },
            any
        >({
            query: (body) => ({
                url: "/events",
                method: "POST",
                body
            }),
            invalidatesTags: (result, error) => error ? [] : ['event'],
        }),

        updateEvent: builder.mutation<
            { message: string },
            { body: any, id: string }
        >({
            query: ({ body, id }) => ({
                url: `/events/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: (result, error) => error ? [] : ['event'],
        }),

        dltEvent: builder.mutation<
            { message: string },
            { eventId: string }
        >({
            query: ({ eventId }) => ({
                url: `/events/${eventId}`,
                method: "DELETE"
            }),

            invalidatesTags: (_, error) => error ? [] : ['event'],

        }),


    }),
});

export const { useAllEventssQuery, useAddEventMutation, useDltEventMutation, useUpdateEventMutation } = EventApi;