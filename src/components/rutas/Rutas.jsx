import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Stock from '../stock/Stock'
import TablaStock from '../stock/TablaStock'
import TablaStock2 from '../stock/TablaStock2'

const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/stock' element={<TablaStock/>}></Route>
        <Route path='/stock2' element={<TablaStock2/>}></Route>
        <Route path='/stock3' element={<Stock/>}></Route>
    </Routes>
    </>
  )
}

export default Rutas