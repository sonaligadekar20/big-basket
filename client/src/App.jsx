import React from 'react'; 
import Home from "./home/Home"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <div className='dark:bg-slate-900 dark:text-white'>
    <Routes>
      <Route path="/" element={<Home/>}/>

    </Routes>
    </div>
    
    </>
  )
}

export default App
