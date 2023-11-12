import { configureStore } from "@reduxjs/toolkit";
import darbarReducer from './darbarSlice'

const store = configureStore({
    reducer : {
       darbarReducer,
    }
})

export default store