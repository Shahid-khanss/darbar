import { useState } from "react"
import menuList from "./menuList"

console.log(menuList)

const TableMenu = () => {
    
const [formData, setFormData] = useState({dish : "", rate : ""})
const [sortedList, setSortedList] = useState(null)
// const [tableCart, setTableCart] = useState([])

console.log(formData)
console.log(sortedList)
// console.log(tableCart)

function handleChange(e){
    searchList()
    e.preventDefault()
    setFormData(prev=>{
        return e.target.value
    })

}

function searchList(){
    let tempList = []
  if(formData){
      
      for(let i=0;i<menuList.length;i++){
          if(menuList[i].dish.indexOf(formData)>-1){
             tempList.push({dish : menuList[i].dish, rate : menuList[i].rate}) 
  
          }else{
             continue
          }
  }
    }

    setSortedList(tempList)
    // console.log(tempList)
}

function handleClick(e,item){
    e.preventDefault()
    // console.log(item)
    setFormData({dish : item.dish, rate: item.rate})
    setSortedList()
}

    return ( 
        <div className="items">
            <div className="parent">
            <input className="dish" value={formData.dish} onChange={handleChange} type="text" />
            <div className="rate">{formData.rate}</div>
            {sortedList ? (
            <div className="sorted-list">
            {sortedList.map(item=>{

                return <div onClick={(e)=>handleClick(e,item)}>{item.dish}</div>
            })}
            </div>) : null}
           </div>
            {/* {menuList.map(item=>{
         return   <div>{item.dish}</div>
        })} */}
            
        </div>
        
     );
}
 
export default TableMenu;