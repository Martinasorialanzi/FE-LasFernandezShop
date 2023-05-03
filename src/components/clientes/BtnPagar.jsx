import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const BtnPagar = ({ producto }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Pagar
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pago proveedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    $ <input defaultValue={`${_.sumBy(_.filter(producto.productos, { "estado": "vendido" }), "precioVenta") - producto.dineroPagado}`}></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default BtnPagar