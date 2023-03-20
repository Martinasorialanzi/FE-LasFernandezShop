import React, { useState, useEffect, useMemo } from "react";
import { GetProducts } from "../../api/GetProducts";
import {  Table } from "react-bootstrap";
import { Column, useTable } from "react-table";


const TablaStock = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
//   const [endpoint] = useState("/products");

  // const getProducts=useCallback(async() => {
  //     console.log("called")
  //     const response=await axios.get(`http://localhost:8080/v1${endpoint}`);
  //     setData(response.data.products);
  //     setIsLoading(false);
  // },
  // [endpoint]
  // )

  // useEffect(() => {
  //     getProducts()
  // }, [getProducts]);

  //   console.log(data)

  useEffect(() => {
    const getProducts = async () => {
      const response = await GetProducts();
      setData(response);
      setIsLoading(false);
    };
    getProducts();
  }, []);

//   interface Data {
//     codigo: Number;
//     prenda: String;
//     marca: String;
//     categoria: String;
//     cliente: String;
//     fechaIngreso: Date;
//     precioVenta: Number;
//     estado: String;
//     tiempoEnVenta: Number;
//   }

  const columns = useMemo(() => [
    { Header: "CODIGO", accessor: "codigo" },
    { Header: "PRENDA", accessor: "prenda" },
    { Header: "MARCA", accessor: "marca" },
    { Header: "CATEGORIA", accessor: "categoria" },
    // { Header: "TALLE", accessor: "" },
    { Header: "CLIENTE", accessor: "cliente" },
    { Header: "FECHA DE INGRESO", accessor: "fechaIngreso" },
    { Header: "PRECIO DE VENTA", accessor: "precioVenta" },
    // { Header: "GANANCIA CLIENTE", accessor: "" },
    // { Header: "GANCANIA FERNANDEZ SHOP", accessor: "", Cell: {} },
    { Header: "ESTADO", accessor: "estado" },
    { Header: "TIEMPO EN VENTA", accessor: "tiempoEnVenta" },
  ],
  []);

  const tableInstance = useTable({
    columns,
    data,
    autoResetHiddenColumns: false, //  <-- stops the rerendering
    autoResetSortBy: false, //  <-- stops the rerendering
  });

  const {
    getTableProps,  //funcion que nos devuelve las propiedades que va a recibir la etiqueta table
    getTableBodyProps,
    headerGroups,  //array que contiene cada uno d elos grupos del header
    rows,          //array que contiene lo que va en cada fila (la data)
    prepareRow
  }=tableInstance



  return (
  <>

  <Table striped bordered hover className='container '{...getTableProps}>
      <thead>
         {/* Loop over the header rows */}
       {headerGroups.map(headerGroup => (
        // Apply the header row props
        <tr {...headerGroup.getHeaderGroupProps()}>
        {// Loop over the headers in each row
        headerGroup.headers.map(column => (
          // Apply the header cell props
          <th {...column.getHeaderProps()}>
            {// Render the header
            column.render('Header')}
          </th>
        ))}
      </tr>
    ))}

      </thead>
      <tbody {...getTableBodyProps()}>
       {rows.map((row) => {
         prepareRow(row)
         return (
        
           <tr {...row.getRowProps()}>
             {row.cells.map(cell => {

               return (
                 <td {...cell.getCellProps()}>
                   { cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
         )
       })}
      </tbody>
    
    </Table>
  </>
  )
};

export default TablaStock;
