import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import categories from './categoriesSlice';
import products from './productsSlice'
import user from './userSlice'
import { apiSlice } from "./api/apiSlice";


export const store = configureStore({
    reducer: {
        categories,
        products,
        user,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})


type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;