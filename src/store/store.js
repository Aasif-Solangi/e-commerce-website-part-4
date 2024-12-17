import counterReducers from "../components/Slices/sliceCounter"
import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "../components/Slices/cart/cartSlice"

export const store = configureStore ({
    reducer :{ 
        counter: counterReducers,
        cart:cartReducers,
        
    },
})