import { IAdminStats } from "../types";
import baseApi from "./baseApi";

const DashboardApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        userStats: builder.query<
            { message: string; data: IAdminStats },
            {}
        >({
            query: (query) => ({
                url: "/dashboard/stats",
                params: query
            }),
        }),

        userChart: builder.query<
            { message: string; data: { month: string, total: number }[] },
            {}
        >({
            query: (query) => ({
                url: `/dashboard/userChart`,
                params: query
            }),
        }),


    }),
});

export const { useUserStatsQuery, useUserChartQuery } = DashboardApi;