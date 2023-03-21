import React, { useState, useEffect, useMemo } from "react";
import { GetProducts } from "../../api/GetProducts";
import { Table } from "react-bootstrap";
import {
  Column,
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

const TablaStock = ({ pageCount: controlledPageCount }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const getProducts = async (page) => {
    setIsLoading(true);
    const response = await GetProducts({ page: page + 1 });
    console.log(response);
    setData(response.products);
    setPageCount(response.totalPages);
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
      initialState: { pageIndex: 0 }, //pagina que iniciamos
      manualPagination: true, //true: nosotros manejamos la paginacion
      pageCount, //le decimos el numero de pagina que tenemos
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
    rows, //array que contiene lo que va en cada fila (la data)
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    nextPage,
    previousPage,
    state,
    state: { pageIndex },
  } = tableInstance;

  useEffect(() => {
    getProducts(pageIndex);
  }, [pageIndex]);

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

      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
      </div>
    </>
  );
};

export default TablaStock;
