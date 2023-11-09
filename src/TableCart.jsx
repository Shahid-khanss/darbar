import { useState } from "react";
import TableMenu from "./TableMenu";

const TableCart = () => {
    
const [tCart, setTCart] = useState(0)
  
function handleClick(e){
    e.preventDefault()
    setTCart(prev=>{
        prev+1
    })
}

    return ( 
        <div className="table-cart">
        
        <TableMenu />
        <a onClick={handleClick} href="" className="add-items">Add Items</a>
        </div>
     );
}
 
export default TableCart;