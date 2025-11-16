import { IMeta, IProduct, IStore } from "../types";
import baseApi from "./baseApi";

const StoreApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        allStores: builder.query<
            { message: string; data: { data: IStore[], meta: IMeta } },
            {}
        >({
            query: (query) => ({
                url: "/stores",
                params: query
            }),
            providesTags: ["stores"],
        }),

        storeDetails: builder.query<
            { message: string; data: IStore },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/stores/${id}`,
            }),
            providesTags: (_, __, { id }) => [{ type: "stores", id }],
        }),

        approveStore: builder.mutation<
            { message: string; data: {} },
            { storeId: string }
        >({
            query: ({ storeId }) => ({
                url: `/stores/approve/${storeId}`,
                method: "PATCH"
            }),
            invalidatesTags: ["stores"],
        }),
        rejectStore: builder.mutation<
            { message: string; data: {} },
            { storeId: string }
        >({
            query: ({ storeId }) => ({
                url: `/stores/reject/${storeId}`,
                method: "PATCH"
            }),
            invalidatesTags: ["stores"],
        }),


        storeProducts: builder.query<
            { message: string; data: { data: IProduct[], meta: IMeta } },
            { storeId: string, page: number }
        >({
            query: ({ storeId, page }) => ({
                url: `/products/store-products/${storeId}`,
                params: { page }
            }),
            providesTags: (_, __, { storeId }) => [{ type: "stores", id: storeId }],
        }),

        updateStore: builder.mutation<
            { message: string },
            { storeId: string, body: any }
        >({
            query: ({ body, storeId }) => ({
                url: `/stores/${storeId}`,
                body,
                method: "PATCH"
            }),
            invalidatesTags: (_, __, { storeId }) => [{ type: "stores", id: storeId }, "stores"],
        }),

    }),
});

export const { useAllStoresQuery, useStoreDetailsQuery, useApproveStoreMutation, useRejectStoreMutation, useStoreProductsQuery, useUpdateStoreMutation } = StoreApi;