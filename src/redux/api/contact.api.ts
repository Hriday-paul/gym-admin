import { Icontact, IEarning, IMeta, IProduct, IStore } from "../types";
import baseApi from "./baseApi";

const ContactApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        allContacts: builder.query<
            { message: string; data: { data: Icontact[], meta: IMeta } },
            {}
        >({
            query: (query) => ({
                url: "/contacts",
                params: query
            }),
            providesTags: ["contacts"],
        }),

        replyContacts: builder.mutation<
            { message: string; data: { data: Icontact[], meta: IMeta } },
            {id : string, body : {message : string}}
        >({
            query: ({id, body}) => ({
                url: `/contacts/reply/${id}`,
                method : "POST",
                body
            }),
            invalidatesTags: ["contacts"],
        }),       

    }),
});

export const { useAllContactsQuery, useReplyContactsMutation } = ContactApi;