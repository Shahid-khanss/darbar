import { useState } from "react";
import TableMenu from "./TableMenu";

const TableCart = () => {
    
const [tCart, setTCart] = useState([<TableMenu />])
console.log(tCart)

function handleAddItems(e){
    e.preventDefault()
    setTCart(prev=>{
        return [...prev,<TableMenu />]
    })
}

// function handleDeleteItems(){

// }

    return ( 
        <div className="table-cart">
            {tCart.map((item,index)=>{
                return ( <div className="item-row">
                    <div className="sno">{index+1}</div>
                    <div className="itemno">{item}</div>
                    <div className="delete">delete</div>
                    </div>             
                )
            })}
        <a onClick={handleAddItems} href="" className="add-items">Add Items</a>
        </div>
     );
}
 
export default TableCart;