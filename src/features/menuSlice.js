import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {data : "null"}

export const sheetDatabase = createAsyncThunk('menu/sheetDatabase', async (_, {rejectWithValue})=>{
    try{
        const data = await axios.get(`https://script.google.com/macros/s/AKfycbyXPOWs-qPm43TSLVIBUmPxJPntFhndNjEd9a6-An0g/dev`, {headers : {'Content-Type' : "application/json"}})
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