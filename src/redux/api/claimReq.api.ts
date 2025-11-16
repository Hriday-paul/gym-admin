import { IBrand, ICalimRes, IMeta } from "../types";
import baseApi from "./baseApi";

const ClaimReqApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        claimStats: builder.query<
            { message: string; data: { total: number, pending: number, approved: number, rejected: number } },
            void
        >({
            query: () => ({
                url: "/claim-reqs/stats",
            }),
            providesTags: ["claimReq"],
        }),
        allClaimReqs: builder.query<
            { message: string, data: { data: ICalimRes[], meta: IMeta } },
            {}
        >({
            query: (query) => ({
                url: "/claim-reqs",
                params: query
            }),
            providesTags: ["claimReq"],
        }),

        approveClaimReqs: builder.mutation<
            { message: string },
            { claimid: string }
        >({
            query: ({ claimid }) => ({
                url: `/claim-reqs/approve/${claimid}`,
                method: "POST"
            }),
            invalidatesTags: ["claimReq"],
        }),
        rejectClaimReqs: builder.mutation<
            { message: string },
            { claimid: string }
        >({
            query: ({ claimid }) => ({
                url: `/claim-reqs/reject/${claimid}`,
                method: "POST"
            }),
            invalidatesTags: ["claimReq"],
        }),



    }),
});

export const { useClaimStatsQuery, useAllClaimReqsQuery, useApproveClaimReqsMutation, useRejectClaimReqsMutation } = ClaimReqApi;