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

  useEffect(()=>{
   
   async function fetchData(){
     const data = await axios.get(`https://script.google.com/macros/s/AKfycbyXPOWs-qPm43TSLVIBUmPxJPntFhndNjEd9a6-An0g/dev`)
     console.log(data)
   }
   fetchData()
  },[])

  return (
    <>
      <img src="src\assets\logo.png" alt="" />
      <Darbar/>
    </>
  )
}

export default App
