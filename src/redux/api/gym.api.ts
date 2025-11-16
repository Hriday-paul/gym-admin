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
                url: "/gyms",
                method: "POST",
                body
            }),
            invalidatesTags: ["gyms"],
        })


    }),
});

export const { useAllGymsQuery, useAddGymMutation } = GymApi;