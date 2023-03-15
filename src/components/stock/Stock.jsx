import React from 'react'
import "../stock/stock.css"
import { Table } from 'react-bootstrap'

const Stock = () => {
  return (
    <>
    <div className='m-4 justify-content-center'>
    <h2>Stock de prendas</h2>
    </div>
    <Table striped bordered hover className='container '>
      <thead>
        <tr>
          <th>CODIGO</th>
          <th>PRENDA</th>
          <th>MARCA</th>
          <th>CLIENTE</th>
          <th>FECHA DE INGRESO</th>
          <th>$ VENTA</th>
          <th>$ CLIENTE</th>
          <th>GANANCIA</th>
          <th>CATEGORIA</th>
          <th>ESTADO</th>
          <th>TIEMPO EN VENTA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
    </>
  )
}

export default Stock