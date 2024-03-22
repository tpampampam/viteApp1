import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils";

export type CategoriesList = {
    id: number
    name: string
    image: string
    creationAt: string
    updatedAt: string
}
type CategoriesState = {
    list: CategoriesList[]
    filtered: any
    related: any
    loading: boolean
    error: null | boolean
}

export const getCategories = createAsyncThunk<CategoriesList[],undefined, {rejectValue: string}>(
    'categories/getCategories',
    async(_, {rejectWithValue}) => {
        try {
            const res = await fetch(`${BASE_URL}/categories`)

            return await res.json()
        }catch(e){
            console.log(e)
            rejectWithValue('error')
        }
    }
)


const initialState: CategoriesState = {
    list: [],
    filtered: [],
    related: [],
    loading: false,
    error: null
}

const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCategories.pending, state => {state.loading = true})
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(getCategories.rejected, state => {state.error = true})
    }

    
})
const {reducer, actions} = categoriesSlice;

export const categoriesSelector = (state: any) => state.categories
export default reducer;