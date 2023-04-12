import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
// import { getProduct, updateProduct } from "../../store/slices/products";

const EditModal = (_id) => {
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);

	const [prenda, setPrenda] = useState("");
	const [marca, setMarca] = useState([]);
	const [categoria, setCategoria] = useState();
	const [talle, setTalle] = useState();
	const [cliente, setCliente] = useState("");
	const [precioVenta, setPrecioVenta] = useState(false);
	const [estado, setEstado] = useState([]);

	const handleClose = () => setShow(false);

	// const producto = useSelector(productsSelectors.selectById);
	const handleShow = (_id) => {
		// dispatch(getProduct(_id._id));
		// console.log(producto);
		// try {
		//   const getProduct = async () => {
		//     const response = await GetProduct(_id._id);
		//     setPrenda(response.prenda);
		//     setMarca(response.marca);
		//     setCategoria(response.categoria);
		//     setTalle(response.talle)
		//     setCliente(response.cliente);
		//     setPrecioVenta(response.precioVenta);
		//     setEstado(response.estado)

		//   };
		//   getProduct();
		// } catch (error) {
		//   console.log(error);
		// }
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
				const formData = {
					prenda: prenda,
					marca: marca,
					categoria: categoria,
					talle: talle,
					cliente: cliente,
					precioVenta: precioVenta,
					estado: estado,
				};
				console.log(formData);
				console.log(_id._id);
				// dispatch(updateProduct(_id, { formData }));
				//  (UpdateProduct(_id._id, formData));
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

			{/* <Modal show={show} onHide={handleClose}>
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
                    onChange={(e) => {
                      setCliente(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
    
                
                  
                
    
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Precio de venta</Form.Label><br/>
                  <Form.Control
                  type="Number"
                    placeholder="Precio de venta"
                    required
                    value={precioVenta}
                    onChange={(e) => {
                      setPrecioVenta(e.target.value);
                    }}
                    />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Estado</Form.Label><br/>
                  <Form.Select
                    required
                    value={estado}
                    onChange={(e) => {
                      setEstado(e.target.value);
                    }}
                    >
                        <option>local</option>  
                        <option>vendido</option>                 
                         </Form.Select>
                </Form.Group>
    
                
               
            
                <Button size="lg"variant="dark" type="submit">
                  Guardar
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
     
    
            </Modal.Footer>
          </Modal> */}
		</>
	);
};

export default EditModal;
