import React,{useState} from 'react'
import { FormSelect,Form, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { GetProduct, UpdateProduct } from '../../api/GetProducts';

const EditModal = (_id) => {

  
        
      const [show, setShow] = useState(false);
    
      const [prenda, setPrenda] = useState("");
      const [marca, setMarca] = useState([]);
      const [categoria, setCategoria] = useState();
      const [talle, setTalle] = useState();
      const [cliente, setCliente] = useState("");
      const [precioVenta, setPrecioVenta] = useState(false);
      const [estado, setEstado] = useState([]);
      
    
    
      
      const handleClose = () => setShow(false);
    
 
      const handleShow = (_id) => {
        try {
          const getProduct = async () => {
            const response = await GetProduct(_id._id);
            console.log(response);
            setPrenda(response.prenda);
            setMarca(response.marca);
            setCategoria(response.categoria);
            setTalle(response.talle)
            setCliente(response.cliente);
            setPrecioVenta(response.precioVenta);
            setEstado(response.estado)

          };
          getProduct();
        } catch (error) {
          console.log(error);
        }
        setShow(true);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        Swal.fire({
          title: 'Esta seguro que quiere guardar los cambios?',
          showDenyButton: true,
          showConfirmButton:true,
          confirmButtonText: 'Guardar',
          denyButtonText: `No guardar`,
          confirmButtonColor: '#E95821',
          denyButtonColor: '#5B5B5B',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire({icon: 'success',
            title: 'Guardado!',
            showConfirmButton: false,
            timer: 1500})
            const formData = {
              prenda: prenda,
              marca: marca,
              categoria: categoria,
              talle:talle,
              cliente: cliente,
              precioVenta:precioVenta,
              estado: estado,
            };
            console.log(formData);
            UpdateProduct(_id._id, formData);
            handleClose()
          } else if (result.isDenied) {
            Swal.fire({icon: 'info',
            title: 'Los cambios no se guardaron!',
            showConfirmButton: false,
            timer: 1500})
          }
        })
      
      };
    
      return (
        <>
          <Button size="md"variant="dark" onClick={(e) => handleShow(_id)}>
            Editar
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
          </Modal>
        </>
      )
}

export default EditModal