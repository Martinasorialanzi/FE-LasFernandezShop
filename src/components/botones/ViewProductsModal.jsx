import React, { useCallback, useState } from "react";
import { Button, Modal, Stack, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteProduct } from "../../store/slices/products";
import EditModal from "./EditModal";

const ViewProductsModal = ({ producto }, _id) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useDispatch();

	const borrarProduct = useCallback((_id) => {
		Swal.fire({
			title: "Estas seguro?",
			text: "No se podra revertir!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#E95821",
			cancelButtonColor: "#5B5B5B",
			confirmButtonText: "Si, borrar!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteProduct(_id._id));

				Swal.fire({
					icon: "success",
					title: "Producto borrado!",
					showConfirmButton: false,
					timer: 1500,
				});
				setShow(false);
			}
		});
	}, []);

	return (
		<>
			<Button variant="dark" size="sm" onClick={handleShow} className="botonVerProducto">
				Ver Producto
			</Button>

			<Modal show={show} onHide={handleClose} centered size="xl">
				<Modal.Header closeButton>
					<Modal.Title className="titulo-view-product">
						Código {producto.codigo}: {producto.prenda}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="">
						<div className="">
							<Stack direction="vertical" gap={0}>
								<p className="titulo-view-product">
									<b>{producto.prenda}</b>
								</p>
								<p className="categorias-view-product">
									<b>Marca: </b> {producto.marca}
								</p>
								<p className="categorias-view-product">
									<b>Categoria: </b> {producto.categoria}
								</p>
								<p className="categorias-view-product">
									<b> Cliente: </b> {producto.cliente}
								</p>
								<p className="categorias-view-product">
									<b>Estado: </b>
									{producto.estado}
								</p>
								<Table bordered hover className="container">
									<thead>
										<tr>
											<th>Precio de venta</th>
											<th>Ganancia Cliente</th>
											<th>Ganancia Fernandez Shop</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>$ {producto.precioVenta}</td>
											<td>$ {producto.precioVenta * 0.7}</td>
											<td>$ {producto.precioVenta * 0.3}</td>
										</tr>
									</tbody>
								</Table>
								<p className="categorias-view-product">
									<b>Fecha de ingreso al sistema: </b>
									{producto.fechaIngreso.substring(0, 10)}
								</p>
							</Stack>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<EditModal _id={producto._id} />
					<Button variant="dark" size="md" onClick={(e) => borrarProduct({ _id: producto._id })}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4"
							width={23}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ViewProductsModal;
