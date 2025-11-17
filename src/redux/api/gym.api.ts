import { IBrand, ICalimRes, IGym, IMeta } from "../types";
import baseApi from "./baseApi";

const GymApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({


        allGyms: builder.query<
            { message: string, data: { data: IGym[], meta: IMeta } },
            {}
        >({
            query: (query) => ({
                url: "/gyms",
                params: query
            }),
            providesTags: ["gyms"],
        }),
        addGym: builder.mutation<
            { message: string, data: { data: IGym[], meta: IMeta } },
            any
        >({
            query: (body) => ({
                url: "/gyms/admin",
                method: "POST",
                body
            }),
            invalidatesTags: (result, error) => error ? [] : ['gyms'],
        }),
        updateGym: builder.mutation<
            { message: string },
            { body: any, id: string }
        >({
            query: ({ body, id }) => ({
                url: `/gyms/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: (result, error) => error ? [] : ['gyms'],
        }),
        dltGymImage: builder.mutation<
            { message: string },
            { gymId: string, imageId: string }
        >({
            query: (body) => ({
                url: "/gyms/gym-image",
                method: "DELETE",
                body
            }),

            invalidatesTags: (result, error) => error ? [] : ['gyms'],

        }),
        dltGym: builder.mutation<
            { message: string },
            { gymId: string }
        >({
            query: ({ gymId }) => ({
                url: `/gyms/${gymId}`,
                method: "DELETE"
            }),

            invalidatesTags: (_, error) => error ? [] : ['gyms'],

        }),


    }),
});

export const { useAllGymsQuery, useAddGymMutation, useUpdateGymMutation, useDltGymImageMutation, useDltGymMutation } = GymApi;