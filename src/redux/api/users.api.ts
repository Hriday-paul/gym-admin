import { IMeta, IUser } from "../types";
import baseApi from "./baseApi";

const UsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allusers: builder.query<
            { message: string; data: { meta: IMeta, data: IUser[] } },
            {}
        >({
            query: (query) => ({
                url: "/users",
                params: query,
            }),
            providesTags: ["users"],
        }),


        block_unblock: builder.mutation<{ message: string, data: { _id: string, name: string }[] }, { userId: string, status: 1 | 0 }>({
            query: ({ userId, status }) => ({
                url: `/users/status/${userId}`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["users"]
        }),


    }),
});

export const { useAllusersQuery, useBlock_unblockMutation } = UsersApi;
