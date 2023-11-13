
import { useEffect, useState } from "react";
// import TableMenu from "./TableMenu";
import { useSelector, useDispatch } from "react-redux"
import { writeItem, deleteItem,total, checkOut, increase, decrease } from "./features/darbarSlice";
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

function handleCheckout(e,tableno){
    e.preventDefault()
    dispatch(checkOut({tableno}))
}

function handleDecrease(e,tableno,dishIndex){
    e.preventDefault()
    dispatch(decrease({tableno,dishIndex}))
}

function handleIncrease(e,tableno,dishIndex){
    e.preventDefault()
    // console.log({tableno,dishIndex})
    dispatch(increase({tableno,dishIndex}))
}

    return ( 
        <div className="table-cart">
            
            <div className="parent-row-header">
                        {/* <div className="sno">{dish.dish}</div> */}
                        <div className="sno-row-header">N</div>
                        <div className="dish-row-header">ITEMS</div>
                        <div className="rate-row-header">₹</div>
            </div>
            
            {state.map(table=>{
            if(table.tableno==props.clicked){
                return table.items.map((dish,index)=>{
                    return(
                        <div key={index} className="parent-row">
                        {/* <div className="sno">{dish.dish}</div> */}
                        <div className="sno-row">{index+1}</div>
                        <div className="dish-row">{dish.dish}</div>
                        <div className="rate-row">{dish.rate}</div>
                        <div className="quantity-field" >
                            <button 
                                className="value-button decrease-button" 
                                onClick={(e)=>{handleDecrease(e,table.tableno,index)}} 
                                title="Azalt">-</button>
                                <div className="number">{dish.q}</div>
                            <button 
                                className="value-button increase-button" 
                                onClick={(e)=>{handleIncrease(e,table.tableno,index)}}
                                title="Arrtır"
                            >+
                            </button>
                            </div>
                        {/* <div className="edit-row">Edit</div> */}
                        <div onClick={(e)=>{handleDelete(e,table.tableno,index)}} className="delete-row"><span className="material-symbols-outlined">
delete_forever
</span></div>
                       
                        </div>
                    )
                })
            }
        })}

            { 
            state.map((table,index)=>{
                if(table.tableno==props.clicked){
                    return  (
                    <div key={index}>
                    <div className="total-row">Total : ₹ {table.total}/-</div>
                    <div onClick={(e)=>{handleCheckout(e,table.tableno)}} className="checkout-row"><span className="material-symbols-outlined cart">
shopping_cart_checkout
</span></div>
                    </div>
                    )
                   }})
            }

         <TableMenu
            tableno = {props.clicked}

            />
           
        </div> 
     );
}

export default TableCart;