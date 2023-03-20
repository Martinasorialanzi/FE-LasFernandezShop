import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Stock from '../stock/Stock'
import TablaStock from '../stock/TablaStock'

const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/stock' element={<TablaStock/>}></Route>
    </Routes>
    </>
  )
}

export default Rutas