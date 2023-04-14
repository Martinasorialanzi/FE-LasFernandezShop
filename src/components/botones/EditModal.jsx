import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useUpdateEstadoProductMutation } from "../../api/apiSlice";
// import { getProduct, updateProduct } from "../../store/slices/products";

const EditModal = (_id) => {

  const [UpdateProduct] = useUpdateEstadoProductMutation()

  const [show, setShow] = useState(false);

  const [prenda, setPrenda] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [talle, setTalle] = useState("");
  const [cliente, setCliente] = useState("");
  const [precioVenta, setPrecioVenta] = useState();
  const [estado, setEstado] = useState("");


  const handleClose = () => setShow(false);


  const handleShow = (_id) => {

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
        Swal.fire({ icon: "success", title: "Guardado!", showConfirmButton: false, timer: 1500 });
        const form = e.target
        const formData = new FormData(form)

        const prenda = formData.get("prenda")
        const marca = formData.get("marca")
        const categoria = formData.get("categoria")
        const talle = formData.get("talle")
        const cliente = formData.get("cliente")
        const precioVenta = formData.get("precioVenta")
        const estado = formData.get("estado")
        const codigo = formData.get("codigo")

        console.log(formData);
        console.log(_id._id);
        UpdateProduct(prenda, marca, categoria, precioVenta, talle, cliente, estado)
        handleClose();
      } else if (result.isDenied) {
        Swal.fire({ icon: "info", title: "Los cambios no se guardaron!", showConfirmButton: false, timer: 1500 });
      }
    });
  };

  return (
    <>
      <Button variant="dark" size="md" onClick={(e) => handleShow(_id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
          width={23}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Prenda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del prenda"
                required
                maxLength={30}
                value={prenda}
                name="prenda"
                onChange={(e) => {
                  setPrenda(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Marca"
                required
                name="marca"
                value={marca}
                onChange={(e) => {
                  setMarca(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Categoria"
                value={categoria}
                name="categoria"
                onChange={(e) => {
                  setCategoria(e.target.value);
                }}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Talle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Talle"
                required
                name="talle"
                value={talle}
                onChange={(e) => {
                  setTalle(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cliente"
                value={cliente}
                name="cliente"
                onChange={(e) => {
                  setCliente(e.target.value);
                }}
                required
              />
            </Form.Group>





            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio de venta</Form.Label><br />
              <Form.Control
                type="Number"
                placeholder="Precio de venta"
                required
                value={precioVenta}
                name="precioVenta"
                onChange={(e) => {
                  setPrecioVenta(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Estado</Form.Label><br />
              <Form.Select
                required
                value={estado}
                name="estado"
                onChange={(e) => {
                  setEstado(e.target.value);
                }}
              >
                <option>local</option>
                <option>vendido</option>
              </Form.Select>
            </Form.Group>




            <Button size="lg" variant="dark" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>


        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
