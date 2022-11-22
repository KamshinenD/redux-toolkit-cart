import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import cartItems from '../../cartItems'

const url = 'https://course-api.com/react-useReducer-cart-project'


const initialState = {
    cartItems: [],
    amount: 5,
    total: 9,
    isLoading: false
};

// export const getCartItems = createAsyncThunk('cart/getCartItems', ()=>{
//     return fetch(url)
//     .then(resp=> resp.json())
//     .catch((error)=>{console.log(error)})
// })

export const getCartItems = createAsyncThunk('cart/getCartItems', async (thunkAPI)=>{
    try {
        const resp = await axios(url);
        return resp.data;
    } catch (error){
        // console.log(error.response.data)
        return thunkAPI.rejectWithValue('something went wrong')
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
        state.cartItems =[];
    },
        removeItem: (state, action)=>{
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item)=> item.id !== itemId)
        },

        increaseItem: (state, {payload})=>{
            const cartItem = state.cartItems.find((item)=> item.id ===payload.id)
            cartItem.amount = cartItem.amount +1
        },
       
        decreaseItem: (state, {payload})=>{
            const cartItem = state.cartItems.find((item)=> item.id ===payload.id)
            cartItem.amount = cartItem.amount -1
        },

        calculateTotals: (state)=>{
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item)=>{
                amount += item.amount;
                total +=  item.amount *item.price;
            })
            state.amount = amount;
            state.total = total;
        }
},
extraReducers: (builder)=>{
    builder
    .addCase(getCartItems.pending, (state)=>{
        state.isLoading = true;
    })
    .addCase(getCartItems.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.cartItems = action.payload;
    })
    .addCase(getCartItems.rejected, (state)=>{
        state.isLoading = false;
    })
},
// extraReducers:{
//     [getCartItems.pending]:(state)=>{
//         state.isLoading = true;
//     },
//     [getCartItems.fulfilled]:(state, action)=>{
//         state.isLoading = false;
//         state.cartItems = action.payload;
//     },
//     [getCartItems.rejected]:(state)=>{
//         state.isLoading = false;
//     },
// }
})

// console.log(cartSlice)

export const {clearCart, removeItem, increaseItem, decreaseItem, calculateTotals}= cartSlice.actions;

export default cartSlice.reducer;