import React, { useState, useEffect, useMemo } from "react";
import { GetProducts } from "../../api/GetProducts";
import { Table } from "react-bootstrap";
import { Column, useTable, useGlobalFilter } from "react-table";

const TablaStock = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const response = await GetProducts();
      setData(response);
      setIsLoading(false);
    };
    getProducts();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "CODIGO", accessor: "codigo" },
      { Header: "PRENDA", accessor: "prenda" },
      { Header: "MARCA", accessor: "marca" },
      { Header: "CATEGORIA", accessor: "categoria" },
      { Header: "TALLE", accessor: "", Cell: "" },
      { Header: "CLIENTE", accessor: "cliente" },
      { Header: "FECHA DE INGRESO", accessor: "fechaIngreso" },
      { Header: "PRECIO DE VENTA", accessor: "precioVenta" },
      { Header: "GANANCIA CLIENTE", Cell: "" },
      { Header: "GANCANIA FERNANDEZ SHOP", accessor: "", Cell: "" },
      { Header: "ESTADO", accessor: "estado" },
      { Header: "TIEMPO EN VENTA", accessor: "tiempoEnVenta" },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      autoResetHiddenColumns: false, //  <-- stops the rerendering
      autoResetSortBy: false, //  <-- stops the rerendering
    },
    useGlobalFilter
  );

  const {
    getTableProps, //funcion que nos devuelve las propiedades que va a recibir la etiqueta table
    getTableBodyProps,
    headerGroups, //array que contiene cada uno d elos grupos del header
    footerGroups,
    rows, //array que contiene lo que va en cada fila (la data)
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  return (
    <>
      <div>
        <input
          type="text"
          value={state.globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        ></input>
        <p>Cantidad de filas encontradas: {preGlobalFilteredRows.length}</p>
      </div>
      <Table striped bordered hover className="container " {...getTableProps}>
        <thead>
          {/* Loop over the header rows */}
          {headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TablaStock;
