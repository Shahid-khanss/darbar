import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {data : "null"}

export const sheetDatabase = createAsyncThunk('menu/sheetDatabase', async (_, {rejectWithValue})=>{
    try{
        const data = await axios.get(`https://script.google.com/macros/s/AKfycbw0VqlAd4rzKnRWNjpac-AwCBqTdp5TGxmdgmbE-MwQAvdT0-5Khd8vn6v-pxMqb0igAw/exec`, {headers : {'Content-Type' : "application/json"}})
        return data
    }catch(error){
        return rejectWithValue(error.response)
    }
    
})


const menuSlice = createSlice({
    name : 'menu',
    extraReducers : (builder=>{
        builder.addCase(sheetDatabase.fulfilled,(state,action)=>{
            console.log(action.payload.data)
            state.data = action.payload.data
        })
        builder.addCase(sheetDatabase.pending,(state,action)=>{
            state.data = "pending"
        })
        builder.addCase(sheetDatabase.rejected,(state,action)=>{
            state.data = action.payload
        })
    })
})

export default menuSlice.reducer