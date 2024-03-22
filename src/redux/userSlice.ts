import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductsList } from "./productsSlice";
import { BASE_URL } from "../utils";


export type UserType = {
    id: number
    email: string
    password: string
    name: string
    role: string
    avatar: string
}

type newUserType = Omit<UserType, 'role'| 'id'>

type UserState = {
    currentUser: null | UserType
    cart: any[]
    formType: string
    showForm: boolean
}

export const createUser = createAsyncThunk<UserType, newUserType,{rejectValue: string}>(
    'user/createUser',
    async(payload, {rejectWithValue}) => {
        try{
            const res = await(fetch(`${BASE_URL}/users`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }))

            return await res.json()
        }catch(e){
            console.log(e)
            rejectWithValue('error')
        }
    }
)

export const logInUser = createAsyncThunk<UserType,Pick<UserType, 'email' | 'password'>,{rejectValue: string}>(
    'user/logInUser',
    async(payload, {rejectWithValue}) => {
        try{
            const resp = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-type':'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await resp.json()
            const login = await fetch(`${BASE_URL}/auth/profile`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${data.access_token}`
                }
            })
            return await login.json();
        }catch(e) {
            console.log(e)
            rejectWithValue('error')
        }
    }
)


export const updateUser = createAsyncThunk<UserType, UserType, {rejectValue: string}>(
    'user/updateUser',
    async (payload, {rejectWithValue}) => {
        console.log(payload)
        try{
            const resp = await fetch(`${BASE_URL}/users/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            return await resp.json();
        }catch(e){
            console.log(e)
            rejectWithValue('error')
        }
    }
)

const addCurrentUser = (state: any,action: any) => {
   state.currentUser = action.payload            
}


const initialState: UserState = {
    currentUser: null,
    cart: [],
    formType: 'signup',
    showForm: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<ProductsList &{ quantity?: number}>) => {
            let newCart: any = [...state.cart]
            const found = state.cart.find(({id}) => id === action.payload.id)

            if(found) {
                newCart = newCart.map((item: any) => {
                    return item.id === action.payload.id ? {...item, quantity: action.payload.quantity || item.quantity + 1} : item
                })
            } else {
                newCart.push({...action.payload, quantity: 1})
            }

            state.cart = newCart;
        },
        removeItemFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(({id}) => id !== action.payload)
        },
        toggleForm: (state, action: PayloadAction<boolean>) => {
            state.showForm = action.payload
        },
        toggleFormType: (state, action: PayloadAction<string>) => {
            state.formType = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, addCurrentUser)
            .addCase(logInUser.fulfilled, addCurrentUser)
            .addCase(updateUser.fulfilled, addCurrentUser)
    }
    
})

const {reducer, actions} = userSlice
export const {addItemToCart, toggleForm, toggleFormType, removeItemFromCart} =actions;
export const userSelector = (state: any) => state.user;
export default reducer
