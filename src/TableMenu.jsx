import { useState } from "react"
// import menuList from "./menuList"
import { useSelector, useDispatch } from "react-redux"
import { writeItem, total } from "./features/darbarSlice"
import { PDFDocument } from "pdf-lib"


const TableMenu = (props) => {
    
const menuList = props.menuList
// console.log(menuList)
    
    const [formData, setFormData] = useState({dish : "", rate : ""})
    const [sortedList, setSortedList] = useState(null)
    const state = useSelector(state=>state.darbarReducer)
    const dispatch = useDispatch()

// console.log("menurender")
// console.log(sortedList)
// console.log(tableCart)

function handleChange(e){
    e.preventDefault()
    searchList()
    setFormData(prev=>{
        return {...prev,dish : e.target.value}
    })

}

function searchList(){
    let tempList = []
  if(formData){
      
      for(let i=0;i<menuList.length;i++){
          if(menuList[i].dish.toUpperCase().indexOf(formData.dish.toUpperCase())>-1){
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
    setFormData(prev=>{
        return {...prev, dish : item.dish, rate: item.rate}
    })
    setSortedList()
    // console.log(props.tableno)
   


}

function handleEnter(e){
    e.preventDefault()
    dispatch(writeItem({tableno : props.tableno, dish : formData.dish, rate : Number(formData.rate), q:1,amount:Number(formData.rate)}))
    setFormData({dish : "", rate : ""})
    dispatch(total({tableno : props.tableno}))
}

    return ( 
        <div className="item-form">
            <div className="parent">
            <input className="dish" value={formData.dish} onChange={handleChange} type="text" />
            <div className="rate">{formData.rate}</div>
            <div onClick={handleEnter} className="enter">Enter</div>
            {sortedList ? (
            <div className="sorted-list">
            {sortedList.map((item,index)=>{ 

                return <div key={index} onClick={(e)=>handleClick(e,item)}>{item.dish}</div>
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