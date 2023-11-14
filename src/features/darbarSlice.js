import { createSlice } from '@reduxjs/toolkit'

// we have first an array of dish and rate which is for a table. Means a table can have an array of dish and rate.
// again this table is itself an array of table in a restaurant.


/* 

const initialState = [
    {display : false, tableno : "1", items : [{dish : "Dish", rate : "Rate", quantity : 1, amount : ""}]},
    {display : false,tableno : "2", items : [{dish : "", rate : ""}]},
    {display : false,tableno : "3", items : [{dish : "soya", rate : 500}]},
    {display : false,tableno : "4", items : [{dish : "", rate : ""}]},
    {display : false,tableno : "5", items : [{dish : "", rate : ""}]},
    {display : false,tableno : "6", items : [{dish : "", rate : ""}]},
  
]

*/


const initialState = [
    {active : false, tableno : "1", items : [], total : ""},
    {active : false, tableno : "2", items : [], total : ""},
    {active : false, tableno : "3", items : [], total : ""},
    {active : false, tableno : "4", items : [], total : ""},
    {active : false, tableno : "5", items : [], total : ""},
    {active : false, tableno : "6", items : [], total : ""},
    {active : false, tableno : "7", items : [], total : ""},
    {active : false, tableno : "8", items : [], total : ""},
    {active : false, tableno : "9", items : [], total : ""},
    {active : false, tableno : "10", items : [], total : ""},
  
]

const darbarSlice = createSlice({
    name : "darbarSlice",
    initialState,
    reducers : {
        writeItem(state,action){ // action should contain table no. and the dish / rate object.
            const {tableno, dish, rate,q,amount} = action.payload;
        //    console.log(action.payload)
            state.forEach(table=>{
            if(table.tableno==tableno){
                table.items.push({dish,rate,q,amount})
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
        activeTable(state){
            state.forEach(table=>{
                if(table.total!=0){
                    table.active=true;
                }else{
                    table.active = false;
                }
            })
        },
        total(state,action){
            const {tableno} = action.payload
            let t = 0;
            state.forEach(table=>{
                if(table.tableno==tableno){
                   table.items.forEach(item=>{
                       t = t+item.amount
                   }
                   
                   )
                   table.total = t
                }
            })
        },
        checkOut(state,action){
            const {tableno} = action.payload
            state.forEach(table=>{
                if(table.tableno==tableno){
                   table.total = 0;
                   table.items = []
                }
            })
        },
        increase(state,action){
            // console.log(state.payload)
            const {tableno,dishIndex} = action.payload;
            state.forEach(table=>{
                if(table.tableno==tableno){
                    table.items[dishIndex].q++
                    table.items[dishIndex].amount=table.items[dishIndex].q*table.items[dishIndex].rate
                }
            })
        },
        decrease(state,action){
            console.log(state.payload)
            const {tableno,dishIndex} = action.payload;
            state.forEach(table=>{
                if(table.tableno==tableno){
                    table.items[dishIndex].q--
                    table.items[dishIndex].amount=table.items[dishIndex].q*table.items[dishIndex].rate
                }
            })
        },
    }
})

export default darbarSlice.reducer

export const {writeItem, deleteItem, activeTable, total, checkOut, increase, decrease} = darbarSlice.actions