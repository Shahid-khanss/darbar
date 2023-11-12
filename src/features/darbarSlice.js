import { createSlice } from '@reduxjs/toolkit'

// we have first an array of dish and rate which is for a table. Means a table can have an array of dish and rate.
// again this table is itself an array of table in a restaurant.


/* 

const initialState = [
    {display : false, tableno : "1", items : [{dish : "Dish", rate : "Rate"}]},
    {display : false,tableno : "2", items : [{dish : "", rate : ""}]},
    {display : false,tableno : "3", items : [{dish : "soya", rate : 500}]},
    {display : false,tableno : "4", items : [{dish : "", rate : ""}]},
    {display : false,tableno : "5", items : [{dish : "", rate : ""}]},
    {display : false,tableno : "6", items : [{dish : "", rate : ""}]},
  
]

*/


const initialState = [
    {display : false, tableno : "1", items : []},
    {display : false,tableno : "2", items : []},
    {display : false,tableno : "3", items : []},
    {display : false,tableno : "4", items : []},
    {display : false,tableno : "5", items : []},
    {display : false,tableno : "6", items : []},
  
]

const darbarSlice = createSlice({
    name : "darbarSlice",
    initialState,
    reducers : {
        writeItem(state,action){ // action should contain table no. and the dish / rate object.
            const {tableno, dish, rate} = action.payload;
           console.log(action.payload)
            state.forEach(table=>{
            if(table.tableno==tableno){
                table.items.push({dish,rate})
            }
           })

        },
        deleteItem(state,action){
            const {tableno,index} = action.payload
            state.forEach(table=>{
                if(table.tableno==tableno){
                   table.items.splice(index,1)
                }
            })
        },
        displayTable(state,action){
            state.forEach(table=>{
                if(table.tableno==action.payload){
                    table.display=true;
                }else{
                    table.display=false;
                }
            })
        }
    }
})

export default darbarSlice.reducer

export const {writeItem, deleteItem, displayTable} = darbarSlice.actions