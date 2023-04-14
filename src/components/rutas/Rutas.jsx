import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import PageTablaStock from '../stock/PageTablaStock'


const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/stock' element={<PageTablaStock/>}></Route>
    </Routes>
    </>
  )
}

export default Rutas