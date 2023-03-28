import React, {useState} from "react";
import ButtonDelete from "./ButtonDelete";
import EditModal from "./EditModal";
import { Button,Modal,Table, Stack } from "react-bootstrap";

const ViewProductsModal = ({ producto }, _id) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                <Table className="container">
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
          <EditModal _id={producto._id}/>
          <ButtonDelete _id={producto._id}/>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewProductsModal;
