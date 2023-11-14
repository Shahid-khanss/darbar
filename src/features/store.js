import { configureStore } from "@reduxjs/toolkit";
import darbarReducer from './darbarSlice'
// import menuReducer from './menuSlice'

const store = configureStore({
    reducer : {
       darbarReducer,
    }
})

export default store