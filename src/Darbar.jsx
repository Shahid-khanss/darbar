import { useEffect, useState } from "react";
// import TableMenu from "./TableMenu";
import { useSelector, useDispatch } from "react-redux"
import { writeItem,displayTable } from "./features/darbarSlice";
import TableCart from "./TableCart";

const Darbar = () => {

const [clicked, setClicked] = useState(false)
const state = useSelector(state=>state.darbarReducer)
// console.log(state)

const dispatch = useDispatch()

// useEffect(()=>{

//     dispatch(writeItem({tableno : 20, dish : "chicken", rate : 200}))
// },[])


function handleClickTable(e,tableno){
    e.preventDefault()
    // dispatch(displayTable(tableno))
    setClicked(tableno)
}

function handleHome(){
    setClicked(false)
}


return ( 
    <div>
    {clicked      // if clicked (true state) on table then show this and send a prop with table no. which is clicked 
    ?
        <div>
        
        <div className="home-row" onClick={handleHome}>Home</div>    
        <div><TableCart
                clicked={clicked}

        />
        </div>   
        </div>
    : 
        <div className="darbar">
        {
        // mapping the tables from the data
        state.map(table=>{
            return (
                <div
                onClick={(e)=>
                    // sending the table number for prop and setting click state to true
                    handleClickTable(e,table.tableno)} 
                className="table">
                    table {table.tableno}
                </div>
            )
        })}


    </div>
    }

    </div>
    );
    
}
    
export default Darbar;

    