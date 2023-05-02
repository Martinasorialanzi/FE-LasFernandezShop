import _ from 'lodash';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const BtnVerMas = ({ producto, _id }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <>
            <Button variant="dark" size='md' onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    width={23}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{producto.proveedor}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Cantidad de Prendas entregadas: {producto.productos.length}
                    <br></br>
                    Cantidad de prendas vendidas: {_.filter(producto.productos, { "estado": "vendido" }).length}
                    <br></br>
                    Ganancia de {producto.proveedor}: ${_.sumBy(_.filter(producto.productos, { "estado": "vendido" }), "precioVenta")}
                    <br></br>
                    Total dinero entregado: ${producto.dineroPagado}
                    <br></br>
                    Dinero restante a pagar: ${_.sumBy(_.filter(producto.productos, { "estado": "vendido" }), "precioVenta") - producto.dineroPagado}


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BtnVerMas