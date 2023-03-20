import React,{useState,useEffect} from 'react'
import "../stock/stock.css"
import { Table,Form } from 'react-bootstrap'
import { GetProducts } from '../../api/GetProducts'
import Paginacion from '../paginacion/Paginacion'

const Stock = () => {

  
  const [productos, setProductos] = useState([]);
  
  const [tableFilter, setTablefilter] = useState("")


  useEffect(() => {
    const getProducts = async () => {
      const response = await GetProducts();
      setProductos(response.products);
      
    };
    
    getProducts();
  }, [setProductos]);

  const[pagina,setPagina]=useState(1)
  const[porPagina,setPorPagina]=useState(50)

  const maximo=(productos.length/porPagina).toFixed()

  return (
    <>
  <div className='my-2 text-right'> 
  <Form className="">
            <Form.Control
              type="text"
              placeholder="Search"
              className="m-2 p-2"
              aria-label="Search"
              onChange={(e)=>setTablefilter(e.target.value)}
            />
          </Form>
  </div>


    <div className='m-4 justify-content-center'>
    <h2>Stock de prendas</h2>
    </div>
    <Table striped bordered hover className='container ' >
      <thead>
        <tr>
          <th>CODIGO</th>
          <th>PRENDA</th>
          <th>MARCA</th>
          <th>CATEGORIA</th>
          <th>TALLE</th>
          <th>CLIENTE</th>
          <th>FECHA DE INGRESO</th>
          <th>PRECIO DE VENTA</th>
          <th>GANANCIA CLIENTE</th>
          <th>GANANCIA FERNANDEZ SHOP</th>
          <th>ESTADO</th>
          <th>TIEMPO EN VENTA</th>
        </tr>
      </thead>
      <tbody>
          {productos
          .slice((pagina-1)*porPagina,(pagina-1)*porPagina+porPagina)
          .map((producto)=>{
            return(
        <tr key={producto._id}>
            <td>{producto.codigo}</td>
            <td>{producto.prenda}</td>
            <td>{producto.marca}</td>
            <td>{producto.categoria}</td>
            <td>{}</td>
            <td>{producto.cliente}</td>
            <td>{producto.fechaIngreso.substring(0,10)}</td>
            <td>${producto.precioVenta}</td>
            <td>${producto.precioVenta*0.30}</td>
            <td>${(producto.precioVenta*0.70).toFixed()}</td>
            <td>{producto.estado}</td>
            <td>{producto.tiempoEnVenta}</td>
        </tr> 
            )
          })}
         
      </tbody>
    
    </Table>

    <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
    </>
  )
}

export default Stock