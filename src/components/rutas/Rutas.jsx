import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageTablaClientes from '../clientes/PageTablaClientes'
import Home from '../home/Home'
import PageTablaStock from '../stock/PageTablaStock'


const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/stock' element={<PageTablaStock />}></Route>
        <Route path='/clientes' element={<PageTablaClientes />}></Route>
      </Routes>
    </>
  )
}

export default Rutas