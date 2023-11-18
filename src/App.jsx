import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
// import { sheetDatabase } from './features/menuSlice'
import { useSelector, useDispatch } from "react-redux"
// import './App.css'
import Home from "./Home"
// import TableMenu from "./TableMenu"
// import Darbar from './TableCart'
import Darbar from './Darbar'

function App() {

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
    <img src="src\assets\logo.png" alt="" />
      <Darbar
      menuList = {menuList}
      
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
