import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Tabla from '../stock/Tabla'

const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/stock' element={<Tabla/>}></Route>
    </Routes>
    </>
  )
}

export default Rutas