
import { useEffect, useState } from "react";
// import TableMenu from "./TableMenu";
import { useSelector, useDispatch } from "react-redux"
import { writeItem, deleteItem,total } from "./features/darbarSlice";
import TableMenu from "./TableMenu";

function TableCart(props) {
    
    const state = useSelector(state=>state.darbarReducer)
    console.log(state)
    
const dispatch = useDispatch()

function handleDelete(e,tableno,index){
    e.preventDefault()
    dispatch(deleteItem({tableno,index}))
    dispatch(total({tableno}))                  //update total value of table after deleting
}

    return ( 
        <div className="table-cart">
            
           
            
            {state.map(table=>{
            if(table.tableno==props.clicked){
                return table.items.map((dish,index)=>{
                    return(
                        <div className="parent-row">
                        {/* <div className="sno">{dish.dish}</div> */}
                        <div className="sno-row">{index+1}</div>
                        <div className="dish-row">{dish.dish}</div>
                        <div className="rate-row">{dish.rate}</div>
                        {/* <div className="edit-row">Edit</div> */}
                        <div onClick={(e)=>{handleDelete(e,table.tableno,index)}} className="delete-row">Delete</div>
                       
                        </div>
                    )
                })
            }
        })}

            { 
            state.map(table=>{
                if(table.tableno==props.clicked){
                    return  (<div className="total-row">Total : ₹ {table.total}/-</div>)
                   }})
            }

         <TableMenu
            tableno = {props.clicked}

            />
           
        </div> 
     );
}

export default TableCart;