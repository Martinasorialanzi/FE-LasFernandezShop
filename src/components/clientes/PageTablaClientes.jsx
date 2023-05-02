import _ from 'lodash';
import React, { useMemo } from "react";
import { useGetAllClientsQuery } from "../../api/apiSlice";
import "../stock/tablaStock.css";
import BtnVerMas from './BtnVerMas';
import TablaCliente from './TablaCliente';


const PageTablaStock = () => {
    const columns = useMemo(
        () => [
            { Header: "Id", accessor: (p) => _.indexOf(p) },
            { Header: "PROVEEDOR", accessor: "proveedor" },
            { Header: "PRENDAS VENDIDAS", accessor: (p) => ` ${_.filter(p.productos, { "estado": "vendido" }).length}/${p.productos.length} ` },
            { Header: "GANANCIA PROVEEDOR", accessor: (p) => `$ ${_.sumBy(_.filter(p.productos, { "estado": "vendido" }), "precioVenta")}` },
            { Header: "DINERO ENTREGADO", accessor: (p) => `$ ${p.dineroPagado}` },
            { Header: "GANANCIA LAS FERNANDEZ SHOP", accessor: (p) => `$ ${_.sumBy(_.filter(p.productos, { "estado": "vendido" }), "precioVenta") * 0.20}` },
            { Header: "VER MAS", accessor: (p) => <BtnVerMas producto={p} /> },



            // poner columna cantidad $pagada, restante,ganancia fernadez shop, boton paga, boton ver productos-> en este poner las prendas con fecha de recibido y fecha de venta, ganancia, cantidad pagada, sobrante, fechas de pago,boton pagar}

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
    console.log(data.clientes)

    return (
        <>
            <TablaCliente data={data.clientes} columns={columns} />
        </>
    );
};

export default PageTablaStock;
