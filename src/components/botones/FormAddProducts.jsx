import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useCreateProductMutation } from "../../api/apiSlice";
import "../stock/tablaStock.css";


const FormAddProducts = (codigo) => {
    const [createProduct] = useCreateProductMutation();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Esta seguro que quiere guardar los cambios?",
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonText: "Guardar",
            // denyButtonText: `No guardar`,
            confirmButtonColor: "#E95821",
            denyButtonColor: "#5B5B5B",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "Guardado!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                const form = e.target;
                const formData = new FormData(form);

                const prenda = formData.get("prenda");
                const marca = formData.get("marca");
                const categoria = formData.get("categoria");
                const talle = formData.get("talle");
                const cliente = formData.get("cliente");
                const precioVenta = formData.get("precioVenta");
                const estado = formData.get("estado");
                const codigo = formData.get("codigo");

                createProduct({
                    prenda,
                    marca,
                    categoria,
                    precioVenta,
                    talle,
                    cliente,
                    estado,
                    codigo,
                });
                console.log({
                    prenda,
                    marca,
                    categoria,
                    precioVenta,
                    talle,
                    cliente,
                    estado,
                    codigo,
                });
                handleClose();
            } else if (result.isDenied) {
                Swal.fire({
                    icon: "info",
                    title: "Los cambios no se guardaron!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <>
            <Button variant="dark" className="btn-agregar-producto" size="sm" onClick={(e) => handleShow()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    width={27}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agrega un nuevo producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Codigo</Form.Label>
                            <Form.Control
                                required
                                value={Number(codigo.codigo + 1)}
                                name="codigo"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Prenda</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del prenda"
                                required
                                maxLength={30}
                                name="prenda"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Marca"
                                required
                                name="marca"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Categoria"
                                name="categoria"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Talle</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Talle"
                                required
                                name="talle"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cliente"
                                name="cliente"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Precio de venta</Form.Label>
                            <br />
                            <Form.Control
                                type="Number"
                                placeholder="Precio de venta"
                                required
                                name="precioVenta"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Estado</Form.Label>
                            <br />
                            <Form.Select required name="estado">
                                <option>local</option>
                                <option>vendido</option>
                            </Form.Select>
                        </Form.Group>

                        <Button size="lg" variant="dark" type="submit">
                            Guardar
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default FormAddProducts;
