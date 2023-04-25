import _ from 'lodash';
import React, { useMemo } from "react";
import { useGetAllClientsQuery } from "../../api/apiSlice";
import "../stock/tablaStock.css";
import TablaCliente from './TablaCliente';


const PageTablaStock = () => {
    const columns = useMemo(
        () => [
            { Header: "Id", accessor: "" },
            { Header: "CLIENTE", accessor: "cliente" },
            { Header: "Prendas vendidas", accessor: "" },
            // { Header: "MARCA", accessor: "marca" },
            // { Header: "CATEGORIA", accessor: "categoria" },

            // {
            //   Header: "FECHA DE INGRESO",
            //   accessor: "fechaIngreso",
            //   Cell: ({ value }) => <>{value.substring(0, 10)}</>,
            // },
            // {
            //     Header: "PRECIO DE VENTA",
            //     accessor: (p) => `$ ${p.precioVenta}`,
            //     id: "precio",
            // },
            // {
            //     Header: "GANANCIA CLIENTE",
            //     accessor: (d) => `$ ${Math.ceil(d.precioVenta * 0.7)}`,
            //     id: "ganancia",
            // },
            // {
            //     Header: "GANCANIA FERNANDEZ SHOP",
            //     accessor: (d) => `$ ${Math.ceil(d.precioVenta * 0.3)}`,
            // },
            // { Header: "ESTADO", accessor: "estado" },
            // // { Header: "TIEMPO EN VENTA", accessor: "_id" },
            // {
            //     Header: "VENDIDO",
            //     accessor: (p) => (
            //         <>
            //             {" "}
            //             {p.estado === "vendido" ? (
            //                 <ButtonDevolver _id={p._id} />
            //             ) : (
            //                 <ButtonVender _id={p._id} />
            //             )}{" "}
            //         </>
            //     ),
            // },
            // {
            //     Header: "Ver Producto",
            //     accessor: (p) => (
            //         <>
            //             <ViewProductsModal producto={p} _id={p._id} />
            //         </>
            //     ),
            // },
        ],
        []
    );
    const { data, isError, isLoading, error } = useGetAllClientsQuery(); //ME PUEDO DVOLVER LA DATA, EL ERROR(TRUE FALSE), PROPIEDAD IS LOADING (TRUEFALSE), ERROR CUAL ES EL ERROR

    if (isLoading) return <div>Loading...</div>;
    else if (isError) return <div>Error:{error}</div>;
    const clientes = {
        lista: _.groupBy(data.totalProducts, "cliente"),
        // sumaMontos: _.sumBy(data.totalProducts, "precioVenta")
    }
    // console.log(clientes)
    console.log(data.clientes)

    // const clientes1 = toArray(groupBy(data.totalProducts, "cliente"))
    // console.log(clientes1)


    return (
        <>
            <TablaCliente data={data.clientes} columns={columns} />
        </>
    );
};

export default PageTablaStock;
