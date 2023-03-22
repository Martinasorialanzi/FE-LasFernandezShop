import React, { useState, useEffect, useMemo } from "react";
import { GetProducts2 } from "../../api/GetProducts";
import { Button, FormCheck, Table,Form, DropdownButton,Dropdown } from "react-bootstrap";
import {
  Column,
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

const TablaStock = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const getProducts = async (page) => {
    setIsLoading(true);
    const response = await GetProducts2();
    console.log(response);
    setData(response.totalProducts);

    setIsLoading(false);
  };

  const columns = useMemo(
    () => [
      { Header: "CODIGO", accessor: "codigo" },
      { Header: "PRENDA", accessor: "prenda" },
      { Header: "MARCA", accessor: "marca" },
      { Header: "CATEGORIA", accessor: "categoria" },
      { Header: "TALLE", accessor: "", Cell: "" },
      { Header: "CLIENTE", accessor: "cliente" },
      {
        Header: "FECHA DE INGRESO",
        accessor: "fechaIngreso",
        Cell: ({ value }) => <>{value.substring(0, 10)}</>,
      },
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
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  
  const {
    canPreviousPage,
    canNextPage,
    getTableProps, //funcion que nos devuelve las propiedades que va a recibir la etiqueta table
    getTableBodyProps,
    headerGroups, //array que contiene cada uno d elos grupos del header
    footerGroups,
    // rows, //array que contiene lo que va en cada fila (la data)
    page,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    nextPage,
    previousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setPageSize,
    allColumns,
    getToggleHideAllColumnsProps,
    
  } = tableInstance;
  const {pageIndex, pageSize}=state
  
  useEffect(() => {
    getProducts();
  }, []);

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
      <div>
        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">    */}
        {/* <Dropdown.Item> */}
        <div>
      <Form.Check 
            type="checkbox"
            label={'Toggle All'}
            {...getToggleHideAllColumnsProps()}
          /> 
          </div>
          {/* </Dropdown.Item> */}
          <div>
            {allColumns.map((column)=>(
              // <Dropdown.Item  key={column.id}>
             <div>
             <label>
              <input
                   type="checkbox"
                   {...column.getToggleHiddenProps()}
                 /> 
                 {column.Header}
                 </label>
                 </div>
                 /* </Dropdown.Item> */
            ))}
          </div>
          {/* </DropdownButton> */}
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
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))
              }
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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

      <div>
        <span>
          Page{''}
          <strong>{pageIndex+1} of {pageOptions.length}</strong>
        </span>
        <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        
      <input type="number" defaultValue={pageIndex+1} 
       onChange={(e)=>{
        const pageNumber=e.target.value ? Number(e.target.value) -1 :0
        gotoPage(pageNumber)
       }} />

        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>

        <select value={pageSize} onChange={(e)=>setPageSize(Number(e.target.value))}>
          {[25,50,75,100].map((pageSize)=>(
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default TablaStock;
