import { useEffect, useState } from "react";
// import TableMenu from "./TableMenu";
import { useSelector, useDispatch } from "react-redux"
import { writeItem,activeTable } from "./features/darbarSlice";
import TableCart from "./TableCart";

const Darbar = () => {

// const [active, setActive] = useState("table")
const [clicked, setClicked] = useState(false)
const state = useSelector(state=>state.darbarReducer)

// console.log(state)

const dispatch = useDispatch()

// check for active tables
dispatch(activeTable())



function handleClickTable(e,tableno){
    e.preventDefault()
    // dispatch(displayTable(tableno))
    setClicked(tableno)
}

function handleHome(){
    setClicked(false)
}


return ( 
    <div className="main-page">
    {clicked      // if clicked (true state) on table then show this and send a prop with table no. which is clicked 
    ?
        <div>
        
        <div className="home-tableno" onClick={handleHome}>Table No : {clicked}</div>    
        <div className="home-row" onClick={handleHome}>Home</div>    
        <div><TableCart
                clicked={clicked}

        />
        </div>   
        </div>
    : 
        <div className="darbar-grid">
        {
        // mapping the tables from the data
        state.map(table=>{
            return (
                <div
                onClick={(e)=>
                    // sending the table number for prop and setting click state to true
                    handleClickTable(e,table.tableno)} 
                className={table.active ? "table-active" : "table"}>
                    T {table.tableno}
                </div>
            )
        })}


    </div>
    }

    </div>
    );
    
}
    
export default Darbar;

    