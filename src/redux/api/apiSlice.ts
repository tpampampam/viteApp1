import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL, buildUrl } from "../../utils";
import { ProductsList } from "../productsSlice";
import { Params } from '../../components/Categories/Category';



export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes:['Product'],
    endpoints: (builder)  => ({
        getProduct: builder.query<ProductsList, string>({
            query: (id: string) => ({
                url: `/products/${id}`
            }),
            providesTags: () => ['Product']
        }),
        getProducts: builder.query({
            query: (params) => buildUrl('/products', params),
            providesTags: () => ['Product']
        })
    })
})

export const { useGetProductQuery, useGetProductsQuery } = apiSlice


