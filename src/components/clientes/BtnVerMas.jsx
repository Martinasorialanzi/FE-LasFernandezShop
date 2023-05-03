
import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import BtnPagar from './BtnPagar';


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

            <Modal show={show} onHide={handleClose} size="lg" className="justify-content-center">
                <Modal.Header closeButton>
                    <Modal.Title>{producto.proveedor}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col xs lg="6" >

                                <Card style={{ height: '7em' }} className='justify-content-center'>
                                    <Card.Title>Total prendas</Card.Title>

                                    <Card.Body>{producto.productos.length}</Card.Body>
                                </Card>
                            </Col>
                            <Col xs lg="6" className='justify-content-center'>
                                <Card style={{ height: '7em' }} className='justify-content-center'>
                                    <Card.Title className='justify-content-center'>Cantidad prendas vendidas</Card.Title>

                                    <Card.Body className='justify-content-center'>{_.filter(producto.productos, { "estado": "vendido" }).length}</Card.Body>
                                </Card>
                            </Col>
                            {/* <Col xs lg="2">
                                <Card>
                                    <Card.Title>Total prendas</Card.Title>

                                    <Card.Body>This is some text within a card body.</Card.Body>
                                </Card>
                            </Col> */}
                        </Row>
                        <Row className="justify-content-md-center m-2" >
                            <Col xs lg="4">
                                <Card style={{ height: '8em' }}>

                                    <Card.Title> Ganancia </Card.Title>

                                    <Card.Body>${_.sumBy(_.filter(producto.productos, { "estado": "vendido" }), "precioVenta")}</Card.Body>
                                </Card></Col>
                            <Col xs lg="4">
                                <Card style={{ height: '8em' }}>
                                    <Card.Title>Total dinero pagado </Card.Title>

                                    <Card.Body>
                                        ${producto.dineroPagado}
                                        <br />
                                        Ultimo pago: ${producto.ultimoPago}
                                        <br />
                                        Fecha ultimpo pago: {producto.fechaUltimoPago}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs lg="4">
                                <Card style={{ height: '9em' }}>
                                    <Card.Title>Dinero restante a pagar</Card.Title>
                                    <Card.Body>${_.sumBy(_.filter(producto.productos, { "estado": "vendido" }), "precioVenta") - producto.dineroPagado}
                                        <br /><br />
                                        <BtnPagar producto={producto} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default BtnVerMas