import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, shuffle } from "../utils";
import { CategoriesList } from "./categoriesSlice";



export type ProductsList = {
    id: number
    title: string
    price: number
    description: string
    images: string[]
    creationAt: string
    updatedAt: string
    category: CategoriesList
}

type ProductsState = {
    list: ProductsList[]
    filtered: ProductsList[]
    related: ProductsList[]
    loading: boolean
    error: null | boolean
}

export const getProducts = createAsyncThunk<ProductsList[], undefined, {rejectValue: string}>(
    'products/getProducts',
    async(_, {rejectWithValue}) => {
        try{
            const resp = await fetch(`${BASE_URL}/products`)

            return await resp.json()
        }catch(e){
            console.log(e)
            rejectWithValue('error')
        }
    }
)

const initialState: ProductsState = {
    list: [],
    filtered: [],
    related: [],
    loading: false,
    error: null
}

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers: {
        filterByPrice: (state, action: PayloadAction<number>) => {
            state.filtered = state.list.filter(({price}) => price < action.payload)
        },
        getRelatedProducts: (state, action: PayloadAction<number>) => {
            const list = state.list.filter(({category: {id}}) => id <= action.payload)
            state.related = shuffle(list)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getProducts.pending, state => {state.loading = true})
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(getProducts.rejected, state => {state.error = true})
    }
})

const {actions, reducer} = productSlice;
export const {filterByPrice, getRelatedProducts} = actions
export const productsSelector = (state: any) => state.products
export default reducer;
