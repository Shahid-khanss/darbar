import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import darbarLogo from './assets/logo.png'
import axios from 'axios'
// import { sheetDatabase } from './features/menuSlice'
import { useSelector, useDispatch } from "react-redux"
// import './App.css'
import Home from "./Home"
// import TableMenu from "./TableMenu"
// import Darbar from './TableCart'
import Darbar from './Darbar'

function App() {

  const [remoteSave, setRemoteSave] = useState(true)
// const menuState = useSelector(state=>state.menuReducer)

// const dispatch = useDispatch()

const [menuList,setmenuList] = useState()
// console.log(menuList)

  useEffect(()=>{
   
   async function fetchData(){
     const data = await axios.get(`https://script.google.com/macros/s/AKfycbw0VqlAd4rzKnRWNjpac-AwCBqTdp5TGxmdgmbE-MwQAvdT0-5Khd8vn6v-pxMqb0igAw/exec`)
     setmenuList(data.data.data)
   }
   fetchData()
  },[])

  return (

    <>

    {menuList
    ?
    <> 
    <div onClick={()=>{ // toggle between server save or not
      setRemoteSave(prev=>{
        return !prev
      })
    }} 
    
    className={remoteSave?"remote-save-green" : "remote-save-red"}></div>
    <img src={darbarLogo} alt="" />
      <Darbar
      menuList = {menuList}
      remoteSave={remoteSave}
      />
      </>
    :

    <div className='loader-main-parent'>
      <div>Fetching Menu</div>
    <div className='loader-main'></div>
    </div>
    }

      
    </>
  )
}

export default App
