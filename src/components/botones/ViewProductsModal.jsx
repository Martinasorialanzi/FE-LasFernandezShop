import React, {useState} from "react";
import EditModal from "./EditModal";
import { Button,Modal,Table, Stack } from "react-bootstrap";
import { deleteProduct } from '../../store/slices/products'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import Swal from 'sweetalert2'


const ViewProductsModal = ({ producto }, _id) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch=useDispatch()
  

  const borrarProduct = useCallback((_id) => {
      Swal.fire({
        title: 'Estas seguro?',
        text: "No se podra revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#E95821',
        cancelButtonColor: '#5B5B5B',
        confirmButtonText: 'Si, borrar!',
        confirmButtonColor: '#E95821',
        
      }).then((result) => {
        if (result.isConfirmed) {
         dispatch( deleteProduct(_id))

          Swal.fire(
            {icon: 'success',
            title: 'Producto borrado!',
            showConfirmButton: false,
            timer: 1500}
          )
          setShow(false)
  
        }
      })      

    },[])


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
                <Table  bordered hover className="container">
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
          <Button variant="dark" size="md" onClick={(e)=>borrarProduct(producto._id)}>Delete</Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewProductsModal;
