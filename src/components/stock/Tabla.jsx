import React, { useMemo } from 'react';
import { useGetProductsQuery } from "../../api/apiSlice";
import { ButtonDevolver, ButtonVender } from "../botones/ButtonsUpdateEstado";
import ViewProductsModal from "../botones/ViewProductsModal";
import "../stock/tablaStock.css";
import TablaStock from './TablaStock';

const Tabla = () => {
   

	const columns = useMemo(
		() => [
			{ Header: "CODIGO", accessor: "codigo" },
			{ Header: "PRENDA", accessor: "prenda" },
			{ Header: "MARCA", accessor: "marca" },
			{ Header: "CATEGORIA", accessor: "categoria" },
			{
				Header: "TALLE",
				accessor: (t) => (
					<>
						{t.talle
							? t.talle
							: t.prenda.includes("TALLE")
							? t.prenda.substring(t.prenda.length - 8).substring(6)
							: null}
					</>
				),
			},
			{ Header: "CLIENTE", accessor: "cliente" },
			// {
			//   Header: "FECHA DE INGRESO",
			//   accessor: "fechaIngreso",
			//   Cell: ({ value }) => <>{value.substring(0, 10)}</>,
			// },
			{
				Header: "PRECIO DE VENTA",
				accessor: (p) => `$ ${p.precioVenta}`,
				id: "precio",
			},
			{
				Header: "GANANCIA CLIENTE",
				accessor: (d) => `$ ${Math.ceil(d.precioVenta * 0.7)}`,
				id: "ganancia",
			},
			{
				Header: "GANCANIA FERNANDEZ SHOP",
				accessor: (d) => `$ ${Math.ceil(d.precioVenta * 0.3)}`,
			},
			{ Header: "ESTADO", accessor: "estado" },
			// { Header: "TIEMPO EN VENTA", accessor: "_id" },
			{
				Header: "VENDIDO",
				accessor: (p) => (
					<> {p.estado === "vendido" ? <ButtonDevolver _id={p._id} /> : <ButtonVender _id={p._id} />} </>
				),
			},
			{
				Header: "Ver Producto",
				accessor: (p) => (
					<>
						<ViewProductsModal producto={p} _id={p._id} />
					</>
				),
			},
		],
		[],
	);
    const {data,isError, isLoading,error}= useGetProductsQuery()  //ME PUEDO DVOLVER LA DATA, EL ERROR(TRUE FALSE), PROPIEDAD IS LOADING (TRUEFALSE), ERROR CUAL ES EL ERROR
	
	if(isLoading) return <div>Loading...</div>;
	else if(isError) return <div>Error:{error.message}</div>;

  return (
    <>
    <TablaStock data={data.totalProducts} columns={columns}/>
    </>
  )
}

export default Tabla