import _ from 'lodash';
import React, { useMemo } from "react";
import { useGetAllClientsQuery } from "../../api/apiSlice";
import "../stock/tablaStock.css";


const PageTablaStock = () => {
    const columns = useMemo(
        () => [
            // { Header: "Id", accessor: "codigo" },
            { Header: "CLIENTE", accessor: "cliente" },
            // { Header: "PRENDA", accessor: "prenda" },
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
    const clientes = _.uniqBy(data.totalProducts, "cliente")
    console.log(data.clients)

    // const clientes1 = toArray(groupBy(data.totalProducts, "cliente"))
    // console.log(clientes1)


    return (
        <>
            {/* <TablaCliente data={data.clients} columns={columns} /> */}
        </>
    );
};

export default PageTablaStock;
