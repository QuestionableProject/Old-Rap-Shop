import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart: null,
};

const cartSlice = createSlice({
    name: "cart", 
    initialState,
    reducers: {
        setCart(state, action) {
            state.cart = action.payload.cart
        },
        removeCart(state) {
            state.cart = null
        }
    }
})

export const {setCart, removeCart} = cartSlice.actions

export default cartSlice.reducer;