import { Icontact, IEarning, IMeta, IProduct, IReport, IStore } from "../types";
import baseApi from "./baseApi";

const ReportApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        allReports: builder.query<
            { message: string; data: { data: IReport[], meta: IMeta } },
            {}
        >({
            query: (query) => ({
                url: "/reports",
                params: query
            }),
            providesTags: ["reports"],
        }),
        singleReport: builder.query<
            { message: string; data: IReport },
            { reportId: string }
        >({
            query: ({ reportId }) => ({
                url: `/reports/${reportId}`,
            }),
            providesTags: (_, __, { reportId }) => [{ type: "reports", id: reportId }],
        }),


    }),
});

export const { useAllReportsQuery, useSingleReportQuery } = ReportApi;