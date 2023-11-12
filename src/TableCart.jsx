
import { useEffect, useState } from "react";
// import TableMenu from "./TableMenu";
import { useSelector, useDispatch } from "react-redux"
import { writeItem, deleteItem } from "./features/darbarSlice";
import TableMenu from "./TableMenu";

function TableCart(props) {
    
    const state = useSelector(state=>state.darbarReducer)
    console.log(state)
    
const dispatch = useDispatch()

function handleDelete(e,tableno,index){
    e.preventDefault()
    dispatch(deleteItem({tableno,index}))

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
         <TableMenu
            tableno = {props.clicked}

            />
        </div>
     );
}

export default TableCart;